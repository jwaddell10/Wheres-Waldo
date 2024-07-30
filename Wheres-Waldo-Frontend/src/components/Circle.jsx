export default function Circle({
	matchCircles,
	setMatchCircles,
	dropDownCoordinates,
}) {
	const addCircle = () => {
		let [x, y] = [
			dropDownCoordinates.dropDownX,
			dropDownCoordinates.dropDownY,
		];
		let newCircle = (
			<circle
				cx={x}
				cy={y}
				r="20"
				stroke="blue"
				fill="none"
				strokeWidth="5"
			/>
		);

		let allCircles = [...matchCircles, newCircle];

		setMatchCircles(allCircles);
		// setMatchedCharacters((prevItems) => [...prevItems, selectedCharacters]);
		// matchedh;
	};

	return { addCircle };
}
