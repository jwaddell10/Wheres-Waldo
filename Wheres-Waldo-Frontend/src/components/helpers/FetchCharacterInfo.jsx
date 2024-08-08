import { useState, useEffect } from 'react';

export default function FetchCharacterInfo(imageId) {
	const [gameCharacters, setGameCharacters] = useState(null);
	const [characterCoordinates, setCharacterCoordinates] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`http://localhost:3000/image/${imageId}`);
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const data = await response.json();
				const characterCoords = data.characters.map(
					(character) => character.coordinates
				);

				setCharacterCoordinates(characterCoords);
				setGameCharacters(data);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [imageId]);

	return { gameCharacters, characterCoordinates, error, loading };
}
