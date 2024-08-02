import { useState } from "react";
import styled from "styled-components";
import waldoBeach from "../assets/waldoBeach.jpg";
import waldoDowntown from "../assets/waldoDowntown.jpg";
import waldoFactory from "../assets/waldoBeach.jpg";
import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";
import PropTypes from "prop-types";

export default function LeaderBoard() {
	const [scores, setScores] = useState([]);
	const [activeIndex, setActiveIndex] = useState(null);

	const fetchScores = async (imageId) => {
		fetch(`http://localhost:3000/image/${imageId}/leaderboard`)
			.then((response) => response.json())
			.then((data) => {
				setScores(data);
			})
			.catch((error) => {
				console.error("Error fetching leaderboard:", error);
			});
	};

	return (
		<>
			<Wrapper>
				<ImageWrapper>
					<div className="difficultyOptions">
						<img
							className={styles.images}
							src={waldoBeach}
							alt=""
							role="Image1"
						/>
						<h2>Waldo Beach</h2>
						<Link
							to={`/image/${
								import.meta.env.VITE_IMAGE_ID
							}/leaderboard`}
						>
							<button
								onClick={() => {
									setActiveIndex(0);
									fetchScores("669921d019b39c65bb5d5745");
								}}
							>
								Click
							</button>
						</Link>
					</div>
					<div className="difficultyOptions">
						<img
							className={styles.images}
							src={waldoDowntown}
							alt=""
							role="Image2"
						/>
						<h2>Waldo Downtown</h2>
						<Link
							to={`/image/${
								import.meta.env.VITE_IMAGE2_ID
							}/leaderboard`}
						>
							<button
								onClick={() => {
									setActiveIndex(1);
									fetchScores("669921d019b39c65bb5d5747");
								}}
							>
								Click
							</button>
						</Link>
					</div>
					<div className="difficultyOptions">
						<img
							src={waldoFactory}
							className={styles.images}
							alt=""
							role="Image3"
						/>
						<h2>Waldo Factory</h2>
						<Link
							to={`/image/${
								import.meta.env.VITE_IMAGE3_ID
							}/leaderboard`}
						>
							<button
								onClick={() => {
									setActiveIndex(2);
									fetchScores("669921d019b39c65bb5d5746");
								}}
							>
								Click
							</button>
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
				<ScoresContainer>
					{scores.map((item, index) => (
						<ScoresTableStyle key={index}>
							<ScoresWrapper>{index + 1}</ScoresWrapper>
							<ScoresWrapper>Name: {item.name}</ScoresWrapper>
							<ScoresWrapper>Time: {item.time}s</ScoresWrapper>
						</ScoresTableStyle>
					))}
				</ScoresContainer>
			)}
		</>
	);
}

const ScoresTableStyle = styled.li`
	display: grid;
	grid-template-columns: 0.5fr 1fr 1fr;
	gap: 1rem;
	justify-items: start;
	padding-left: 10px;
    padding: 0.25rem 0 0.25rem 0.5rem;
	border: 1px solid white;
`;

const ScoresWrapper = styled.div`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

const ScoresContainer = styled.ul`
	list-style-type: none;
	padding: 0;
	margin-top: 10px;
	width: 100%;
	border: 1px solid white;
	max-width: 600px;
`;

const ImageWrapper = styled.section`
	display: flex;
	justify-content: space-between;
	align-items: stretch;
	width: 100vw;
	height: auto;
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
}