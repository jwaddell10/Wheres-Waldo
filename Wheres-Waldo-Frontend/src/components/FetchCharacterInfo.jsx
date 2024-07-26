import { useState, useEffect } from "react";

export default function FetchCharacterInfo(imageId) {
	const [gameCharacters, setGameCharacters] = useState(null);
	const [characterCoordinates, setCharacterCoordinates] = useState(null);

	useEffect(() => {
		fetch(`http://localhost:3000/image/${imageId}`)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				const characterCoords = data.characters.map(
					(character) => character.coordinates
				);
				setCharacterCoordinates(characterCoords);
				setGameCharacters(data);
			});
	}, [imageId]);

	return { gameCharacters, characterCoordinates };
}
