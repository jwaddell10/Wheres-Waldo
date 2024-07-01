import { Link, Outlet } from "react-router-dom";

function NavBar() {
	return (
		<>
			<Link to="/">Home</Link>
			<Link to="/leaderboard">LeaderBoard</Link>
			<Outlet />
		</>
	);
}

export default NavBar;
