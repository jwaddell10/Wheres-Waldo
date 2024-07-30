import { useEffect, useState } from "react";
import waldoBeach from "../assets/waldoBeach.jpg";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import PropTypes from "prop-types";
import CharacterNavBar from "./CharacterNavBar";
import Counter from "./Counter";
import FetchCharacterInfo from "./FetchCharacterInfo";
import Circle from "./Circle";
import CheckTarget from "./CheckTarget";
import EndGame from "./EndGame";

export default function Image1() {
	const imageId = import.meta.env.VITE_IMAGE_ID;
	const characters = ["wally", "wizard", "odlaw"];
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
	const [userName, setUserName] = useState(null);

	// useEffect(() => {
	// 	if (matchedCharacters.length === characters.length) {
	// 		EndGame(userName, setUserName);
	// 	}
	// }, [matchedCharacters]);

	const { addCircle } = Circle({
		characters,
		matchCircles,
		setMatchCircles,
		dropDownCoordinates,
	});

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
				fill="none"
				stroke="#FF6F69"
				strokeWidth="5"
			/>
		);

		setCircles(newCircle);
	};

	return (
		<>
			{matchedCharacters.length === characters.length && (
				<EndGame imageId={imageId} />
			)}
			<Counter />
			<CharacterNavBar
				style={{ display: "flex" }}
				characters={characters}
			/>
			<div className="image1" style={{ position: "relative" }}>
				<img
					src={waldoBeach}
					alt="Waldo Beach"
					style={{ width: "100%", height: "auto" }}
				/>
				<svg
					title="circleAndDropDownMenu"
					onClick={(event) => {
						addCircleAndDropDownMenu(event);
						// UserClickPost(imageId);
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
						characters={characters}
						addCircle={addCircle}
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
	characters,
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
	border: 2px solid white;
	background-color: #ff6f69;
	border-radius: 15px;
`;

const DropDownItem = styled.section`
	margin: 1.25rem;
	padding: 0.5rem;
	border: 1px solid white;
	border-radius: 15px;
`;

DropDown.propTypes = {
	xCoordinates: PropTypes.number,
	yCoordinates: PropTypes.number,
	onClick: PropTypes.func,
};
