import { useEffect } from "react";

export default function UserClickPost() {
	const sendUserClicks = async (url, coordinates) => {
		try {
			const response = await fetch(url, coordinates,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
                    body: JSON.stringify({
                        coordinates
                    })
				}
			);

			const data = await response.json();
			return data;
		} catch (error) {
			console.log(error, "this is error");
            throw error;
		}
		// await fetch(`http://localhost:3000/image/${imageId}`)
		// 	.then((response) => {
		// 		console.log(response, "this is response");
		// 		response.json();
		// 	})
		// 	.then((data) => console.log(data, "this is data"));
	};
	return { sendUserClicks }
}
