import waldoFactory from "../assets/waldoFactory.jpg";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import PropTypes from "prop-types";
import CharacterNavBar from "./helpers/CharacterNavBar";
import Counter from "./helpers/Counter";
import FetchCharacterInfo from "./helpers/FetchCharacterInfo";
import checkTarget from "./helpers/CheckTarget";
import useCircle from "./helpers/Circle";
import AddScoreForm from "./helpers/AddScoreForm";
import EndGame from "./helpers/EndGame";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css"

export default function Image3() {
	const imageId = import.meta.env.VITE_IMAGE3_ID;
	const characters = ["wally", "wenda", "odlaw"];
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

	const { addCircle } = useCircle({
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

	const { gameCharacters, characterCoordinates, error, loading } =
		FetchCharacterInfo(imageId);

	if (error) {
		return <div style={{color: "red"}}>Game didn't start: {error} <Link className={styles.link} to="/">Home</Link></div>
	}
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
			<div className="image3" style={{ position: "relative" }}>
				<CharacterNavBar
					style={{ position: "absolute", display: "flex" }}
					characters={characters}
				/>
				<img
					src={waldoFactory}
					alt="Waldo Factory"
					style={{ width: "100%", height: "auto" }}
				/>
				<svg
					title="circleAndDropDownMenu"
					onClick={(event) => {
						addCircleAndDropDownMenu(event);
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

		const match = checkTarget(
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
