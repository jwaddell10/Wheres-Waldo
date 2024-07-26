import { useState } from "react";
import waldoBeach from "../assets/waldoBeach.jpg";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import PropTypes from "prop-types";
import UserClickPost from "./UserClickPost";
import CharacterNavBar from "./CharacterNavBar";
import Counter from "./Counter";
import FetchCharacterInfo from "./FetchCharacterInfo";

export default function Image1() {
	const imageId = import.meta.env.VITE_IMAGE_ID;
	const characters = ["wally", "wizard", "odlaw"];
	const [coordinates, setCoordinates] = useState({ x: null, y: null });
	const [dropDownCoordinates, setDropDownCoordinates] = useState({
		x: null,
		y: null,
	});
	const [circles, setCircles] = useState(null);
	const [circleVisible, setCircleVisible] = useState(false);
	const [dropDownVisible, setDropDownVisible] = useState(false);

	const { sendUserClicks } = UserClickPost();

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

	const handleClick = async (event) => {
		const selectedCharacter = event.target.innerText;
		const result = await sendUserClicks(
			`http://localhost:3000/image/${imageId}`,
			selectedCharacter,
			coordinates,
			imageId
		);

		return result;
	};

	return (
		<>
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
				</svg>
				{dropDownVisible && (
					<DropDown
						role="Dropdown"
						xCoordinates={dropDownCoordinates.dropDownX}
						yCoordinates={dropDownCoordinates.dropDownY}
						coordinates={coordinates}
						characterCoordinates={characterCoordinates}
						// onClick={handleClick}
						imageId={imageId}
						characters={characters}
					/>
				)}
			</div>
		</>
	);
}

function DropDown({
	coordinates,
	characterCoordinates,
	xCoordinates,
	yCoordinates,
}) {
	const checkIfCharactersFound = (coordinates, characterCoordinates) => {
		//current plan, match coordinates with selected character, see if there's a match (I probably can just see if the coords
		//match anything since the game is so small...)
	
		const x = coordinates.x
		const y = coordinates.y
		const bottomLeftX = [x - 5]
		const bottomLeftY = [y - 5]
		const topRightX = [x + 5]
		const topRightY = [y + 5]
		const characterX = characterCoordinates.map((coords) => coords[0])
		const characterY = characterCoordinates.map((coords) => coords[1])

		function checkTarget(
			characterX,
			characterY,
			bottomLeftX,
			bottomLeftY,
			topRightX,
			topRightY
		) {
			if (
				characterX >= bottomLeftX &&
				characterX <= topRightX &&
				characterY >= bottomLeftY &&
				characterY <= topRightY
			) {
				return true;
			} else {
				return false;
			}
		}
		const match = checkTarget(
			characterX,
			characterY,
			bottomLeftX,
			bottomLeftY,
			topRightX,
			topRightY
		);
		console.log(match, 'this is match')

		//if match is true, draw a circle, if circles = character.length, res.json game is over and display this to user
	};
	return (
		<DropDownStyled x={xCoordinates} y={yCoordinates}>
			<DropDownItem
				onClick={() => {
					checkIfCharactersFound(coordinates, characterCoordinates);
				}}
			>
				Waldo
			</DropDownItem>
			<DropDownItem
				onClick={() => {
					checkIfCharactersFound(coordinates, characterCoordinates);
				}}
			>
				Wizard
			</DropDownItem>
			<DropDownItem
				onClick={() => {
					checkIfCharactersFound(coordinates, characterCoordinates);
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
