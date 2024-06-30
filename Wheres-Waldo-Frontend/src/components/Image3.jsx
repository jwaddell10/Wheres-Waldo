import { Link } from "react-router-dom";
import waldoFactory from "../assets/waldoFactory.jpg";
import { useState } from "react";
import styled from "styled-components";

function Image3() {
	const [xCoordinates, setXCoordinates] = useState(null);
	const [yCoordinates, setYCoordinates] = useState(null);
	const [dropDownVisible, setDropDownVisible] = useState(false);

	const handleClick = (e) => {
		const xCoordinate = e.clientX;
		const yCoordinate = e.clientY;

		setXCoordinates(xCoordinate);
		setYCoordinates(yCoordinate);
		setDropDownVisible(!dropDownVisible);
		//need to have dropdown
		//need to have target box
	};
	return (
		<>
			<header>
				<Link to="/">Return Home</Link>
			</header>
			<div className="image1">
				<img
					src={waldoFactory}
					onClick={(e) => {
						handleClick(e);
					}}
					alt=""
				/>
				{dropDownVisible && (
					<DropDown
						xCoordinates={xCoordinates}
						yCoordinates={yCoordinates}
					/>
				)}
			</div>
		</>
	);
}

function DropDown({ xCoordinates, yCoordinates }) {
	return (
		<DropDownStyled x={xCoordinates} y={yCoordinates}>
			<div className="dropDown">
				<option value="Waldo">Waldo</option>
				<option value="Wenda">Wenda</option>
				<option value="Odlaw">Odlaw</option>
			</div>
		</DropDownStyled>
	);
}

const DropDownStyled = styled.section`
	top: ${(props) => props.y}px;
	left: ${(props) => props.x}px;
	position: absolute;
`;

export default Image3;
