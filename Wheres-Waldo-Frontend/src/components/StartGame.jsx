// export default function StartGame({ imageId }) {
//     const startGame = async () => {
// 		try {
// 			const response = await fetch(
// 				`http://localhost:3000/image/${imageId}/gameStart`,
// 				{
// 					method: "POST",
// 					headers: {
// 						"Content-Type": "application/json",
// 					},
// 				}
// 			);
// 		} catch (error) {
// 			console.log(error, "this is error");
// 		}
// 	};

//     return { startGame }
// }