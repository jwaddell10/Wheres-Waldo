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
						<div style={{ marginBottom: "10px" }}>
							Time submitted! Check leaderboard to
							see ranking. Redirecting...
						</div>
					</div>
				) : (
					<div style={{ marginBottom: "10px" }}>
						Congrats! Enter name to be added to
						leaderboard
					</div>
				)}
				<div style={{ display: "flex", justifyContent: "center"}}>
					<input
						type="text"
						name="user"
						placeholder="Username..."
						required
						style={{ backgroundColor: "white", borderRadius: "10px", color: "black" }}
					/>
					<button
						onClick={() => {
							submitScore();
							onClose();
						}}
						style={{ backgroundColor: "red" }}
						type="submit"
					>
						Submit
					</button>
				</div>
			</form>
		</>,
		document.getElementById("domPortal")
	);
}

const ADD_TO_FORM_STYLES = {
	width: "30vw",
	position: "fixed",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	backgroundColor: "#cadcfc",
	borderRadius: "10px",
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
	open: PropTypes.boolean,
	onClose: PropTypes.func,
};
