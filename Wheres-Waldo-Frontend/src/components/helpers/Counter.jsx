/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
//found this solution on stackoverflow... so can't take credit for it...
export default function Counter() {
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
		const intervalId = setInterval(() => {
			const left = new Date() - initTime;
			showTimer(left);
		}, 1);
		return () => {
			clearInterval(intervalId);
		};
	}, []);

	return <>{time}</>;
}
