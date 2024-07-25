import { useEffect, useState } from "react";

export default function Counter() {
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
	}, []);

	// function counter() {
	//     let count = 0;
	//     setInterval(() => {
	//         count++
	//         setTime(count)
	//     }, 1000)
	// }
	// counter();
	return <div>{time}</div>;
}
