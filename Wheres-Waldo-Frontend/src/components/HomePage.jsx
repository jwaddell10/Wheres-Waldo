/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import waldoBeach from "../assets/waldoBeach.jpg";
import waldoDowntown from "../assets/waldoDowntown.jpg";
import waldoFactory from "../assets/waldoFactory.jpg";
import styled from "styled-components";
import styles from "./HomePage.module.css";

function HomePage() {
	return (
		<>
			<Header />
			<Body />
		</>
	);
}

function Header() {
	return (
		<>
			<div className="title">
				<h1 className={styles.text}>Where's Waldo</h1>
			</div>
		</>
	);
}

function Body() {
	const startGame = async (imageId) => {
		try {
			const response = await fetch(
				import.meta.env.API_URL`/image/${imageId}/gameStart`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			return response;
		} catch (error) {
			console.log(error, "this is error");
		}
	};

	return (
		<>
			<div className="gameRules">
				<p style={{ color: "red" }} role="gameRules">
					Welcome to Where's Waldo! To play, click image below. Timer
					starts once you select your image. Good luck!
				</p>
			</div>
			<ImageWrapper>
				<ImageCard>
					<div className="difficultyOptions">
						<h2 style={{ color: "red" }}>Waldo Beach</h2>
						<Link
							onClick={() => {
								startGame(import.meta.env.VITE_IMAGE_ID);
							}}
							to={`/image/${import.meta.env.VITE_IMAGE_ID}`}
						>
							<img
								className={styles.images}
								src={waldoBeach}
								alt="waldo beach"
								style={{ border: "3px solid red" }}
							/>
						</Link>
					</div>
				</ImageCard>
				<ImageCard>
					<div className="difficultyOptions">
						<h2 style={{ color: "red" }}>Waldo Downtown</h2>
						<Link
							onClick={() => {
								startGame(import.meta.env.VITE_IMAGE2_ID);
							}}
							to={`/image/${import.meta.env.VITE_IMAGE2_ID}`}
						>
							<img
								className={styles.images}
								src={waldoDowntown}
								alt="waldo downtown"
								style={{ border: "3px solid red" }}
							/>
						</Link>
					</div>
				</ImageCard>
				<ImageCard>
					<div className="difficultyOptions">
						<h2 style={{ color: "red" }}>Waldo Factory</h2>
						<Link
							onClick={() => {
								startGame(import.meta.env.VITE_IMAGE3_ID);
							}}
							to={`/image/${import.meta.env.VITE_IMAGE3_ID}`}
						>
							<img
								src={waldoFactory}
								className={styles.images}
								alt="waldo factory"
								style={{ border: "3px solid red" }}
							/>
						</Link>
					</div>
				</ImageCard>
			</ImageWrapper>
		</>
	);
}

const ImageCard = styled.section``;

const ImageWrapper = styled.section`
	display: flex;
	justify-content: space-between;
	align-items: stretch;
	max-width: 100%;
	max-height: 100%;
	gap: 1rem;
`;

export default HomePage;
