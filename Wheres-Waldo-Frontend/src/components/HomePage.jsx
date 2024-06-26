import { Link } from "react-router-dom";

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
			<div className="difficultyOptionsWrapper">
				<div className="difficultyOptions">
					<h1>Image Here</h1>
					<h2>Title of Image Here</h2>
					<Link to="/image">
						<button>Click</button>
					</Link>
				</div>
				<div className="difficultyOptions">
					<h1>Image 2 Here</h1>
					<h2>Title of Image 2 Here</h2>
					<Link to="/image2">
						<button>Click</button>
					</Link>
				</div>
				<div className="difficultyOptions">
					<h1>Image 3 Here</h1>
					<h2>Title of Image 3 Here</h2>
					<Link to="/image3">
						<button>Click</button>
					</Link>
				</div>
			</div>
		</>
	);
}

export default HomePage;
