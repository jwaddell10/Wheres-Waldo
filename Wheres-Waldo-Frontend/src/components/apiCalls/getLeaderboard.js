export const getLeaderboard = async ({imageId}) => {
    return fetch(`http://localhost:3000/image/${imageId}/leaderboard`)
    .then((response) => response.json())
    .catch((error) => {
        throw new Error(error);
    });
}