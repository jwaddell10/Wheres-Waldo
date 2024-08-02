import { Link, Outlet } from "react-router-dom";
import styles from "./NavBar.module.css";


function NavBar() {
	return (
		<>
			<Link className={styles.link}to="/">Home</Link>
			<Link className={styles.link} to="/leaderboard">LeaderBoard</Link>
			<Outlet />
		</>
	);
}

export default NavBar;
