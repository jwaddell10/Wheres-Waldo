import { useEffect } from "react";

export default function UserClickPost() {
	const sendUserClicks = async (url, characters, coordinates, imageId) => {
		try {
			const response = await fetch(url,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
                    body: JSON.stringify({
                        characters,
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
