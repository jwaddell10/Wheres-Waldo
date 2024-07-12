export default function UserClickPost() {
	const sendUserClicks = async (url, selectedCharacter, coordinates, imageId) => {
		try {
			const response = await fetch(url,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
                    body: JSON.stringify({
                        selectedCharacter,
                        coordinates,
                        imageId,
                    })
				}
			);

			const data = await response.json();
			return data;
		} catch (error) {
			console.log(error, "this is error");
            throw error;
		}
	};
	return { sendUserClicks }
}
