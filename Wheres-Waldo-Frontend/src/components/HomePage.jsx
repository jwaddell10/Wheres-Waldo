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
				<h1 role="title">{title}</h1>
			</div>
		</>
	);
}

function Body() {
	const gameRules =
		"This is a photo tagging app. I'm putting the rules here. Select your option below";

	const startGame = async () => {
		const imageId = import.meta.env.VITE_IMAGE_ID;
		try {
			const response = await fetch(`http://localhost:3000/image/${imageId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data = await response.json()
			console.log(data, 'this is data')
		} catch(error) {
			console.log(error, 'this is error')
		}
		
	};

	// const response = await fetch(url,
	// 	{
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify({
	// 			selectedCharacter,
	// 			coordinates,
	// 			imageId,
	// 		})
	// 	}
	// );
	
	return (
		<>
			<div className="gameRules">
				<p role="gameRules">{gameRules}</p>
			</div>
			<ImageWrapper>
				<ImageCard>
					<div className="difficultyOptions">
						<img
							className={styles.images}
							src={waldoBeach}
							alt=""
							role="Image1"
						/>
						<h2>Waldo Beach</h2>
						<Link to={`/image/${import.meta.env.VITE_IMAGE_ID}`}>
							<button onClick={startGame}>Click</button>
						</Link>
					</div>
				</ImageCard>
				<ImageCard>
					<div className="difficultyOptions">
						<img
							className={styles.images}
							src={waldoDowntown}
							alt=""
							role="Image2"
						/>
						<h2>Waldo Downtown</h2>
						<Link to={`/image/${import.meta.env.VITE_IMAGE2_ID}`}>
							<button
								onClick={(event) => {
									startGame;
								}}
							>
								Click
							</button>
						</Link>
					</div>
				</ImageCard>
				<ImageCard>
					<div className="difficultyOptions">
						<img
							src={waldoFactory}
							className={styles.images}
							alt=""
							role="Image3"
						/>
						<h2>Waldo Factory</h2>
						<Link to={`/image/${import.meta.env.VITE_IMAGE3_ID}`}>
							<button onClick={startGame}>Click</button>
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
