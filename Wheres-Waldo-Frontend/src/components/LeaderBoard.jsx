import { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

function LeaderBoard() {
	const [scores, setScores] = useState([]);

	useEffect(() => {
		fetch(`http://localhost:3000/leaderboard`)
			.then((response) => response.json())
			.then((data) => {
				setScores(data);
			})
			.catch((error) => {
				console.error("Error fetching leaderboard:", error);
			});
	}, []);

	const renderScores = (puzzleId, title) => (
		<PuzzleWrapper key={uuidv4()}>
			<h1>{title}</h1>
			{scores
				.filter((item) => item.puzzle === puzzleId)
				.map((item) => (
					<div key={uuidv4()}>
						<li style={{ listStyleType: "none" }}>
							User: {item.name} {item.time}s
						</li>
					</div>
				))}
		</PuzzleWrapper>
	);

	return (
		<ScoresWrapper>
			{scores && renderScores("669921d019b39c65bb5d5745", "Waldo Beach")}
			{scores &&
				renderScores("669921d019b39c65bb5d5747", "Waldo Downtown")}
			{scores &&
				renderScores("669921d019b39c65bb5d5746", "Waldo Factory")}
		</ScoresWrapper>
	);
}

const ScoresWrapper = styled.section`
	display: flex;
	flex-direction: row;
`;

const PuzzleWrapper = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export default LeaderBoard;
