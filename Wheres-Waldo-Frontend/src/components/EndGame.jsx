export default function EndGame() {
	const endGame = (event) => {
		const form = event.target;
		const formData = new FormData(form);
		const formDataObj = Object.fromEntries(formData.entries());
		event.preventDefault();
		fetch(`http://localhost:3000/leaderboard`, {
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
			<form onSubmit={endGame}>
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
