import { useEffect, useState } from "react";
import waldoBeach from "../assets/waldoBeach.jpg";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import PropTypes from "prop-types";
import CharacterNavBar from "./helpers/CharacterNavBar";
import { Link } from "react-router-dom";
import FetchCharacterInfo from "./helpers/FetchCharacterInfo";
import useCircle from "./helpers/Circle";
import checkTarget from "./helpers/CheckTarget";
import EndGame from "./helpers/EndGame";
import AddScoreForm from "./helpers/AddScoreForm";
import styles from "./NavBar.module.css";
import { css } from "styled-components";

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
	const [isOpen, setIsOpen] = useState(false);
	const [gameEnd, setGameEnd] = useState(null);

	useEffect(() => {
		if (matchedCharacters.length === characters.length) {
			EndGame(imageId);
			setGameEnd(true);
			setIsOpen(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [matchedCharacters]);

	const { addCircle } = useCircle({
		characters,
		matchCircles,
		setMatchCircles,
		dropDownCoordinates,
	});

	const { gameCharacters, characterCoordinates, error } =
		FetchCharacterInfo(imageId);

	if (error) {
		const message = "Game didn't start.";
		return (
			<div style={{ color: "red" }}>
				{message} {error}
				<Link className={styles.link} to="/">
					Home
				</Link>
			</div>
		);
	}

	const addCircleAndDropDownMenu = (event) => {
		if (isOpen) {
			return;
		}
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
			{isOpen && (
				<AddScoreForm
					open={() => {
						isOpen;
					}}
					onClose={() => setIsOpen(false)}
					imageId={imageId}
				/>
			)}
			<div
				id="domPortal"
				className="image1"
				style={{ position: "relative" }}
			>
				<CharacterNavBar
					style={{ position: "absolute", display: "flex" }}
					characters={characters}
					gameEnd={gameEnd}
				/>
				<StyledImage
					src={waldoBeach}
					alt="Waldo Beach"
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

const device = {
	md: "1100px",
	lg: "1100px",
	xl: "1400px",
};

const media = {
	md: (...args) => css`
		@media (max-width: ${device.md}) {
			${css(...args)};
		}
	`,
	lg: (...args) => css`
		@media (min-width: ${device.lg}) {
			${css(...args)};
		}
	`,
	xl: (...args) => css`
		@media (min-width: ${device.xl}) {
			${css(...args)};
		}
	`,
};

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

const StyledImage = styled.img`
	width: 100%;
	height: auto;
	${media.md`
	height: 70vh;`}
	${media.lg`
	height: 80vh;`}
${media.xl`
	height: 90vh;`}
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
