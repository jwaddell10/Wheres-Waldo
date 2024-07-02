import waldoFactory from "../assets/waldoFactory.jpg";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

export default function Image3() {
	const [coordinates, setCoordinates] = useState({ x: null, y: null });
	const [circles, setCircles] = useState(null);
	const [circleVisible, setCircleVisible] = useState(false);
	const [dropDownVisible, setDropDownVisible] = useState(false);

	const addCircleAndDropDownMenu = (event) => {
		const rect = event.target.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;

		setCoordinates({ x, y });
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

	return (
		<div className="image3" style={{ position: "relative" }}>
			<img
				src={waldoFactory}
				alt="Waldo Factory"
				style={{ width: "100%", height: "auto" }}
			/>
			<svg
				title="circleAndDropDownMenu"
				onClick={addCircleAndDropDownMenu}
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
					xCoordinates={coordinates.x}
					yCoordinates={coordinates.y}
				/>
			)}
		</div>
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
