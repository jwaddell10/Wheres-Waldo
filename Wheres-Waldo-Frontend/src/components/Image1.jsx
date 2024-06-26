import { Link } from "react-router-dom";
import waldoBeach from "../assets/waldoBeach.jpg"

function Image1() {

	return (
		<>
			<header>
				<Link to="/">Return Home</Link>
			</header>
			<div className="image1">
				<img src={waldoBeach} alt="" />
			</div>	
		</>
	);
}

export default Image1;
