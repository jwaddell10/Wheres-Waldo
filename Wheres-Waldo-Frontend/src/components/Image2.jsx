import waldoDowntown from "../assets/waldoDowntown.jpg";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import PropTypes from "prop-types";
import UserClickPost from "./UserClickPost";
import CharacterNavBar from "./helpers/CharacterNavBar";
import Counter from "./helpers/Counter";
import FetchCharacterInfo from "./helpers/FetchCharacterInfo";
import CheckTarget from "./helpers/CheckTarget";
import Circle from "./helpers/Circle";
import AddScoreForm from "./helpers/AddScoreForm";
import EndGame from "./helpers/EndGame";

export default function Image2() {
	const imageId = import.meta.env.VITE_IMAGE2_ID;
	const characters = ["wally", "wenda", "wizard", "odlaw"];
	const [coordinates, setCoordinates] = useState({ x: null, y: null });
	const [dropDownCoordinates, setDropDownCoordinates] = useState({
		x: null,
		y: null,
	});
	const [circles, setCircles] = useState(null);
	const [matchCircles, setMatchCircles] = useState([]);
	const [circleVisible, setCircleVisible] = useState(false);
	const [dropDownVisible, setDropDownVisible] = useState(false);
	const [matchedCharacters, setMatchedCharacters] = useState([]);

	const { addCircle } = Circle({
		matchCircles,
		setMatchCircles,
		dropDownCoordinates,
	});

	useEffect(() => {
		if (matchedCharacters.length === characters.length) {
			EndGame();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [matchedCharacters]);

	const { gameCharacters, characterCoordinates } =
		FetchCharacterInfo(imageId);

	const addCircleAndDropDownMenu = (event) => {
		const rect = event.target.getBoundingClientRect();
		const { width, height } = event.target.getBoundingClientRect();
		const { offsetX, offsetY } = event.nativeEvent;
		const dropDownX = event.clientX - rect.left;
		const dropDownY = event.clientY - rect.top;
		const x = Math.round((offsetX / width) * 100);
		const y = Math.round((offsetY / height) * 100);
		setCoordinates({ x, y });
		setDropDownCoordinates({ dropDownX, dropDownY });
		setDropDownVisible(!dropDownVisible);
		setCircleVisible(!circleVisible);

		let newCircle = (
			<circle
				key={uuidv4()}
				title="circle"
				cx={dropDownX}
				cy={dropDownY}
				r="25"
				stroke="black"
				fill="white"
				fillOpacity="0.3"
				strokeWidth="7"
				strokeDasharray="10 5"
			/>
		);

		setCircles(newCircle);
	};

	return (
		<>
			{matchedCharacters.length === characters.length && (
				<AddScoreForm imageId={imageId} />
			)}
			<Counter />
			<CharacterNavBar characters={characters} />
			<div className="image2" style={{ position: "relative" }}>
				<img
					src={waldoDowntown}
					alt="Waldo Downtown"
					style={{ width: "100%", height: "auto" }}
				/>
				<svg
					title="circleAndDropDownMenu"
					onClick={(event) => {
						addCircleAndDropDownMenu(event);
						UserClickPost(imageId);
					}}
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
					}}
				>
					{circleVisible && circles}
					{matchCircles}
				</svg>
				{dropDownVisible && (
					<DropDown
						role="Dropdown"
						xCoordinates={dropDownCoordinates.dropDownX}
						yCoordinates={dropDownCoordinates.dropDownY}
						coordinates={coordinates}
						characterCoordinates={characterCoordinates}
						gameCharacters={gameCharacters}
						addCircle={addCircle}
						imageId={imageId}
						characters={characters}
						matchedCharacters={matchedCharacters}
						setMatchedCharacters={setMatchedCharacters}
					/>
				)}
			</div>
		</>
	);
}

function DropDown({
	addCircle,
	coordinates,
	characterCoordinates,
	gameCharacters,
	xCoordinates,
	yCoordinates,
	matchedCharacters,
	setMatchedCharacters,
}) {
	const imageId = import.meta.env.VITE_IMAGE_ID;
	const checkIfCharactersFound = (
		event,
		coordinates,
		characterCoordinates
	) => {
		const x = coordinates.x;
		const y = coordinates.y;

		const characterName = event.target.innerText;

		const match = CheckTarget(
			event,
			imageId,
			x,
			y,
			gameCharacters,
			characterCoordinates,
			matchedCharacters,
			setMatchedCharacters
		);

		if (match === true) {
			if (matchedCharacters.includes(characterName)) {
				return;
			}
			setMatchedCharacters((prevCharacter) => [
				...prevCharacter,
				characterName,
			]);
			addCircle(coordinates);
		}
	};
	return (
		<DropDownStyled x={xCoordinates} y={yCoordinates}>
			<DropDownItem
				onClick={(event) => {
					checkIfCharactersFound(
						event,
						coordinates,
						characterCoordinates
					);
				}}
			>
				Waldo
			</DropDownItem>
			<DropDownItem
				onClick={(event) => {
					checkIfCharactersFound(
						event,
						coordinates,
						characterCoordinates
					);
				}}
			>
				Wizard
			</DropDownItem>
			<DropDownItem
				onClick={(event) => {
					checkIfCharactersFound(
						event,
						coordinates,
						characterCoordinates
					);
				}}
			>
				Wenda
			</DropDownItem>
			<DropDownItem
				onClick={(event) => {
					checkIfCharactersFound(
						event,
						coordinates,
						characterCoordinates
					);
				}}
			>
				Odlaw
			</DropDownItem>
		</DropDownStyled>
	);
}

const DropDownStyled = styled.section`
	top: ${(props) => props.y + 20}px;
	left: ${(props) => props.x + 10}px;
	position: absolute;
	color: white;
	background-color: black;
	border-radius: 15px;
`;

const DropDownItem = styled.section`
	font-size: 15px;
	margin: 5px;
	padding: 0.5rem;
	border: 1px solid white;
	border-radius: 15px;
`;

DropDown.propTypes = {
	xCoordinates: PropTypes.number,
	yCoordinates: PropTypes.number,
	onClick: PropTypes.func,
	addCircle: PropTypes.func,
	coordinates: PropTypes.object,
	characterCoordinates: PropTypes.array,
	gameCharacters: PropTypes.object,
	matchedCharacters: PropTypes.array,
	setMatchedCharacters: PropTypes.func,
};
