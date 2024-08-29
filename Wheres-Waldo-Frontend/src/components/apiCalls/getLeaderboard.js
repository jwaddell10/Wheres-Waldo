export const getLeaderboard = async ({ imageId }) => {
	return fetch(`${import.meta.env.VITE_API_URL}/image/${imageId}/leaderboard`)
		.then((response) => response.json())
		.catch((error) => {
			throw new Error(error);
		});
};
