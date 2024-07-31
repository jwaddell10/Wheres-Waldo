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

	endGame();
}
