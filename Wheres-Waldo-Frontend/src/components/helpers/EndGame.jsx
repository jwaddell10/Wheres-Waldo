export default async function EndGame() {
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

		const data = await response.json()

		return data;
	} catch (error) {
		console.log(error, "this is error");
	}
}
