import waldoDowntown from "../assets/waldoDowntown.jpg";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import PropTypes from "prop-types";
import UserClickPost from "./UserClickPost";
import CharacterNavBar from "./CharacterNavBar";

export default function Image2() {
	const imageId = import.meta.env.VITE_IMAGE2_ID;
	const characters = ["wally", "wenda", "wizard", "odlaw"]
	const [coordinates, setCoordinates] = useState({ x: null, y: null });
	const [dropDownCoordinates, setDropDownCoordinates] = useState({ x: null, y: null})
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
		setDropDownCoordinates({ dropDownX, dropDownY })
		setDropDownVisible(!dropDownVisible);
		setCircleVisible(!circleVisible);

		let newCircle = (
			<circle
				key={uuidv4()}
				title="circle"
				cx={x}
				cy={y}
				r="25"
				fill="none"
				stroke="#FF6F69"
				strokeWidth="5"
			/>
		);

		setCircles(newCircle);
	};

	const handleClick = (event) => {
		const selectedCharacter = event.target.innerText;
		sendUserClicks(
			`http://localhost:3000/image/${imageId}`,
			selectedCharacter,
			coordinates,
			imageId
		);
	};

	return (
		<>
			<CharacterNavBar
				characters={characters}
			/>
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
						xCoordinates={coordinates.x}
						yCoordinates={coordinates.y}
						onClick={handleClick}
					/>
				)}
			</div>
		</>
	);
}

function DropDown({ xCoordinates, yCoordinates, onClick }) {
	return (
		<DropDownStyled x={xCoordinates} y={yCoordinates}>
			<DropDownItem
				onClick={(event) => {
					onClick(event);
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
				Wenda
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
