import { Link, Outlet } from "react-router-dom";
import styles from "./NavBar.module.css";
import waldo from "../assets/wheres-waldo-background.jpg";

function NavBar() {
	return (
		<>
			<div
				style={{
					top: "0px",
					display: "flex",
					justifyContent: "end",
					gap: "10px",
				}}
			>
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

				<Link className={styles.link} to="/">
					Home
				</Link>
				<Link className={styles.link} to="/leaderboard">
					LeaderBoard
				</Link>
			</div>

			<Outlet />
		</>
	);
}

export default NavBar;
