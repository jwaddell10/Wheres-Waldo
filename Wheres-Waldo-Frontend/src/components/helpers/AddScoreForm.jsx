import PropTypes from "prop-types";
import ReactDom from "react-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddScoreForm({ open, onClose, imageId }) {
	const navigate = useNavigate();
	const [displayMessage, setDisplayMessage] = useState(false);
	const [shouldNavigate, setShouldNavigate] = useState(false);

	useEffect(() => {
		if (shouldNavigate) {
			setTimeout(() => {
				navigate("/");
			}, "3000");
		}
	});

	if (!open) {
		return null;
	}

	const submitScore = (event) => {
		event.preventDefault();
		try {
			setDisplayMessage(true);
			const form = event.target;
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
			setShouldNavigate(true);
		} catch (error) {
			console.log("error", error);
		}
	};

	return ReactDom.createPortal(
		<>
			<div style={OVERLAY_STYLES}></div>
			<form style={ADD_TO_FORM_STYLES} onSubmit={submitScore}>
				{displayMessage ? (
					<div>
						<div>
							Your time was submitted. Check the leaderboard to
							see your ranking. You will be redirected in a
							moment...
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
				<button
					onClick={() => {
						submitScore();
						onClose();
					}}
					type="submit"
				>
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
