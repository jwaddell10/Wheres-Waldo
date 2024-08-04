import { Link, Outlet } from "react-router-dom";
import styles from "./NavBar.module.css";
import waldo from "../assets/wheres-waldo-background.jpg";

function NavBar() {
	return (
		<>
			<div>
				<img
					src={waldo}
					alt=""
					style={{
						width: "300px",
						position: "absolute",
						top: "-10px",
						left: "0",
					}}
				/>
				<div style={{ position: "absolute", top: "10px", right: "10px"}}>
					<Link style={{marginRight: "10px"}} className={styles.link} to="/">
						Home
					</Link>
					<Link className={styles.link} to="/leaderboard">
						LeaderBoard
					</Link>
				</div>
			</div>
			<div>
				<Outlet />
			</div>
		</>
	);
}

export default NavBar;
