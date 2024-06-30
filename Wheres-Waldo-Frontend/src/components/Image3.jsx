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
			<div className="image3">
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
				<DropDownItem>Waldo</DropDownItem>
				<DropDownItem>Wenda</DropDownItem>
				<DropDownItem>Odlaw</DropDownItem>
			</div>
		</DropDownStyled>
	);
}

const DropDownStyled = styled.section`
	top: ${(props) => props.y}px;
	left: ${(props) => props.x}px;
	position: absolute;
	color: white;
	border: 2px solid white;
	background-color: red;
	border-radius: 15px;
`;

const DropDownItem = styled.section`
	margin: 1.25rem;
	padding: 0.5rem;
	border: 1px solid white;
	border-radius: 15px;
`;

export default Image3;
