import { useState } from "react";
import waldoBeach from "../assets/waldoBeach.jpg";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import PropTypes from "prop-types";
import UserClickPost from "./UserClickPost";
import CharacterNavBar from "./CharacterNavBar";
import Counter from "./Counter";

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
				</svg>
				{dropDownVisible && (
					<DropDown
						role="Dropdown"
						xCoordinates={dropDownCoordinates.dropDownX}
						yCoordinates={dropDownCoordinates.dropDownY}
						onClick={handleClick}
						imageId={imageId}
					/>
				)}
			</div>
		</>
	);
}

function DropDown({ xCoordinates, yCoordinates, onClick, imageId }) {
	const checkIfCharactersFound = async () => {
		try {
			const response = await fetch(
				`http://localhost:3000/image/${imageId}`
			);
			console.log(response, "this is response");
		} catch (error) {
			console.log(error, "this is error");
		}
	};
	return (
		<DropDownStyled x={xCoordinates} y={yCoordinates}>
			<DropDownItem
				onClick={(event) => {
					onClick(event);
					checkIfCharactersFound();
				}}
			>
				Waldo
			</DropDownItem>
			<DropDownItem
				onClick={(event) => {
					onClick(event);
				}}
			>
				Wizard
			</DropDownItem>
			<DropDownItem
				onClick={(event) => {
					onClick(event);
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
