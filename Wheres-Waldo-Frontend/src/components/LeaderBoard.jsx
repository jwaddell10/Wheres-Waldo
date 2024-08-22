import { useState } from "react";
import styled from "styled-components";
import waldoBeach from "../assets/waldoBeach.jpg";
import waldoDowntown from "../assets/waldoDowntown.jpg";
import waldoFactory from "../assets/waldoFactory.jpg";
import { Link } from "react-router-dom";
import styles from "./LeaderBoard.module.css"
import PropTypes from "prop-types";
import { getLeaderboard } from "./apiCalls/getLeaderboard";

export default function LeaderBoard() {
	const [scores, setScores] = useState([]);
	const [activeIndex, setActiveIndex] = useState(null);

	const fetchScores = async (imageId) => {
		console.log('hey')

		await getLeaderboard({imageId}).then((data) => {
			data.sort((a, b) => a.time - b.time)
			setScores(data);
		})
	};

	return (
		<>
			<Wrapper>
				<h1 className={styles.text} >Leaderboard</h1>
				<h1 className={styles.text} style={{ fontSize: "20px" }}>
					Click an image to view the scores
				</h1>
				<ImageWrapper>
					<div className="difficultyOptions">
						<h2 className={styles.text}>Waldo Beach</h2>
						<Link
							onClick={() => {
								setActiveIndex(0);
								fetchScores("669921d019b39c65bb5d5745");
							}}
							to={`/image/${
								import.meta.env.VITE_IMAGE_ID
							}/leaderboard`}
						>
							<img
								className={styles.images}
								src={waldoBeach}
								alt="waldobeach"
								role="Image1"
								style={{ border: "3px solid red" }}
							/>
						</Link>
					</div>
					<div className="difficultyOptions">
						<h2 className={styles.text}>Waldo Downtown</h2>
						<Link
							to={`/image/${
								import.meta.env.VITE_IMAGE2_ID
							}/leaderboard`}
							onClick={() => {
								setActiveIndex(1);
								fetchScores("669921d019b39c65bb5d5747");
							}}
						>
							<img
								className={styles.images}
								src={waldoDowntown}
								alt="waldodowntown"
								role="Image2"
								style={{ border: "3px solid red" }}
							/>
						</Link>
					</div>
					<div className="difficultyOptions">
						<h2 className={styles.text}>Waldo Factory</h2>
						<Link
							to={`/image/${
								import.meta.env.VITE_IMAGE3_ID
							}/leaderboard`}
							onClick={() => {
								setActiveIndex(2);
								fetchScores("669921d019b39c65bb5d5746");
							}}
						>
							<img
								src={waldoFactory}
								className={styles.images}
								alt="waldofactory"
								role="Image3"
								style={{ border: "3px solid red" }}
							/>
						</Link>
					</div>
				</ImageWrapper>
				<ScoresTable scores={scores} isActive={activeIndex === 0} />
				<ScoresTable scores={scores} isActive={activeIndex === 1} />
				<ScoresTable scores={scores} isActive={activeIndex === 2} />
			</Wrapper>
		</>
	);
}

function ScoresTable({ scores, isActive }) {
	return (
		<>
			{isActive && scores && scores.length > 0 && (
				<table className={styles.table} style={{ width: "100%"}}>
					<thead>
						<tr>
							<th className={styles.table}>Rank</th>
							<th className={styles.table}>Name</th>
							<th className={styles.table}>Time</th>
						</tr>
					</thead>
					<tbody className={styles.text}>
						{scores.map((item, index) => (
							<tr key={index}>
								<td className={styles.table}>{index + 1}</td>
								<td className={styles.table}>{item.name}</td>
								<td className={styles.table}>
									{item.time}s
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</>
	);
}

const ImageWrapper = styled.section`
	display: flex;
	justify-content: space-between;
	align-items: stretch;
	max-width: 100%;
	max-height: 100%;
	gap: 1rem;
`;

const Wrapper = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

ScoresTable.propTypes = {
	scores: PropTypes.array,
	isActive: PropTypes.bool,
};
