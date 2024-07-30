export default function EndGame(imageId, userName, setUserName) {
	const endGame = async (event) => {
		event.preventDefault();
		await fetch(`http://localhost:3000/image/${imageId}`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.STRINGIFY({ userName }),
		});
	};

	return (
		<>
			<form onSubmit={endGame}>
				<input
					type="text"
					name="user"
					onChange={(e) => setUserName(e.target.value)}
					placeholder="Enter your username"
					required
				/>
				<button type="submit">Submit</button>
			</form>
		</>
	);
}
