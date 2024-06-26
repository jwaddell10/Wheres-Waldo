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
	const title = "Where's Waldo! A photo tagging game";
	return (
		<>
			<div className="title">
				<h1>{title}</h1>
			</div>
		</>
	);
}

function Body() {
	const gameRules =
		"This is a photo tagging app. I'm putting the rules here. Select your option below";

	return (
		<>
			<div className="gameRules">
				<p>{gameRules}</p>
			</div>
			<ImageWrapper>
				<ImageCard>
					<div className="difficultyOptions">
						<img
							className={styles.images}
							src={waldoBeach}
							alt=""
						/>
						<h2>Waldo Beach</h2>
						<Link to="/image">
							<button>Click</button>
						</Link>
					</div>
				</ImageCard>
				<ImageCard>
					<div className="difficultyOptions">
						<img
							className={styles.images}
							src={waldoDowntown}
							alt=""
						/>
						<h2>Waldo Downtown</h2>
						<Link to="/image2">
							<button>Click</button>
						</Link>
					</div>
				</ImageCard>
				<ImageCard>
					<div className="difficultyOptions">
						<img
							src={waldoFactory}
							className={styles.images}
							alt=""
						/>
						<h2>Waldo Factory</h2>
						<Link to="/image3">
							<button>Click</button>
						</Link>
					</div>
				</ImageCard>
			</ImageWrapper>
		</>
	);
}

const ImageCard = styled.section`
	width: 25%;
	height: 25%;
`;

const ImageWrapper = styled.section`
	display: flex;
	justify-content: space-between;
	align-items: stretch;
`;

export default HomePage;
