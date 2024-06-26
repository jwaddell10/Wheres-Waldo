import { Link } from "react-router-dom";
import waldoDowntown from "../assets/waldoDowntown.jpg"

function Image2() {
	return (
		<>
			<header>
				<Link to="/">Return Home</Link>
			</header>
			<div>
				<img src={waldoDowntown} alt="" />
			</div>
		</>
	);
}

export default Image2;
