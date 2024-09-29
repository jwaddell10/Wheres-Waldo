export default async function EndGame({imageId}) {
	console.log(imageId, 'imageidendgame')
	try {
		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/image/${imageId}/gameEnd`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		const data = await response.json();

		return data;
	} catch (error) {
		console.log(error, "this is error");
	}
}
