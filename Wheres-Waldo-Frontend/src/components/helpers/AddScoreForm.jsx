import PropTypes from "prop-types";
import ReactDom from "react-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddScoreForm({ open, onClose, imageId }) {
	const navigate = useNavigate();
	const [displayMessage, setDisplayMessage] = useState(false);

	if (!open) {
		return null;
	}

	const submitScore = (event) => {
		event.preventDefault();
		try {
			console.log("submit runs");
			setDisplayMessage(true);
			const form = event.target;
			console.log(event, "event");
			console.log(form, "form");
			const formData = new FormData(form);
			const formDataObj = Object.fromEntries(formData.entries());
			fetch(`http://localhost:3000/image/${imageId}/leaderboard`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ formDataObj }),
			});
			navigate("/");
		} catch (error) {
			console.log("error", error);
		}
	};

	return ReactDom.createPortal(
		<>
			<div style={OVERLAY_STYLES}></div>
			<form
				style={ADD_TO_FORM_STYLES}
				onSubmit={(event) => {
					submitScore(event);
				}}
			>
				{displayMessage ? (
					<div>
						{" "}
						<div>
							Your time was submitted. Check the leaderboard to
							see your ranking.
						</div>
					</div>
				) : (
					<div>
						Congrats on finishing! Enter your name to be added to
						the leaderboard
					</div>
				)}
				<input
					type="text"
					name="user"
					placeholder="Enter your username"
					required
				/>
				<button onClick={onClose} type="submit">
					Submit
				</button>
			</form>
		</>,
		document.getElementById("domPortal")
	);
}

const ADD_TO_FORM_STYLES = {
	position: "fixed",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	backgroundColor: "#FFF",
	borderRadius: "50px",
	color: "black",
	padding: "50px",
	zIndex: 1000,
};

const OVERLAY_STYLES = {
	position: "fixed",
	left: "0",
	top: "0",
	right: "0",
	bottom: "0",
	backgroundColor: "black",
	opacity: "0.33",
};

AddScoreForm.propTypes = {
	imageId: PropTypes.string,
};
