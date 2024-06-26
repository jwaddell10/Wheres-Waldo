import { Link } from "react-router-dom";
import waldoFactory from "../assets/waldoFactory.jpg"

function Image3() {
	return (
		<>
			<header>
				<Link to="/">Return Home</Link>
			</header>
			<div>
				<img src={waldoFactory} alt="" />
			</div>
		</>
	);
}

export default Image3;
