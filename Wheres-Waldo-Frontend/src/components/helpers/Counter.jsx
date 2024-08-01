/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
//found this solution on stackoverflow... so can't take credit for it...
export default function Counter() {
	// eslint-disable-next-line no-unused-vars
	const [count, setCount] = useState(null);
	const [time, setTime] = useState(null);

	const initTime = new Date();
	// let count = 0;

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
		const intervalId = setInterval(() => {
			const left = new Date() - initTime;
			setCount(left);
			showTimer(left);
		}, 1);
		return () => {
			clearInterval(intervalId);
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
}
