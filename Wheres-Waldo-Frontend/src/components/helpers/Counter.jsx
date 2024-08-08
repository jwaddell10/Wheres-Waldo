/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
//found this solution on stackoverflow... so can't take credit for it...
export default function Counter({ gameEnd }) {
	const [time, setTime] = useState(null);

	const initTime = new Date();

	const showTimer = (ms) => {
		const milliseconds = Math.floor((ms % 1000) / 10)
			.toString()
			.padStart(2, "0");
		const seconds = Math.floor((ms / 1000) % 60)
			.toString()
			.padStart(2, "0");
		const minutes = Math.floor((ms / 1000 / 60) % 60)
			.toString()
			.padStart(2, "0");

		setTime(minutes + ":" + seconds + ":" + milliseconds);
	};

	useEffect(() => {
		if (gameEnd) {
			return;
		}
		const intervalId = setInterval(() => {
			const left = new Date() - initTime;
			showTimer(left);
		}, 1);
		return () => {
			clearInterval(intervalId);
		};
	}, [gameEnd]);

	return (
		<>
			<StyledCounterContainer>Time: {time}</StyledCounterContainer>
		</>
	);
}

const StyledCounterContainer = styled.section`
	background: white;
	opacity: 0.8;
	color: black;
`;

Counter.propTypes = {
	gameEnd: PropTypes.func,
}
