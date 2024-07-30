export default function AddScoreForm({ imageId }) {
	const submitScore = (event) => {
		event.preventDefault();
		const form = event.target;
		const formData = new FormData(form);
		const formDataObj = Object.fromEntries(formData.entries());
		console.log(formDataObj, "this is form dataobj");
		fetch(`http://localhost:3000/image/${imageId}/gameEnd`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ formDataObj }),
		});
	};

	return (
		<>
			<form onSubmit={submitScore}>
				<input
					type="text"
					name="user"
					placeholder="Enter your username"
					required
				/>
				<button type="submit">Submit</button>
			</form>
		</>
	);
}
