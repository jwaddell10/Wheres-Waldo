export default function useCircle({
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
				stroke="#4d4dff"
				fill="none"
				strokeWidth="5"
			/>
		);

		let allCircles = [...matchCircles, newCircle];

		setMatchCircles(allCircles);
	};

	return { addCircle };
}
