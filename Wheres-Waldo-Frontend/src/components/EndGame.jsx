export default async function EndGame() {
	const endGame = async () => {
		const imageId = import.meta.env.VITE_IMAGE_ID;
		try {
			const response = await fetch(
				`http://localhost:3000/image/${imageId}/gameEnd`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

		} catch (error) {
			console.log(error, "this is error");
		}
	};

    const submitScore = (event) => {
        const form = event.target
        const formData = new FormData(form)
        const formDataObj = Object.fromEntries(formData.entries())
        console.log(formDataObj, 'this is form dataobj')
    }

	endGame();
	// const addUser = (event) => {
	// 	const form = event.target;
	// 	const formData = new FormData(form);
	// 	const formDataObj = Object.fromEntries(formData.entries());
	// 	event.preventDefault();
	// 	fetch(`http://localhost:3000/leaderboard`, {
	// 		method: "POST",
	// 		headers: {
	// 			Accept: "application/json",
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify({ formDataObj }),
	// 	});
	// };

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
