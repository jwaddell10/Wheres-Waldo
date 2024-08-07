export default function checkTarget(event, imageId, x, y, gameCharacters) {
	const characterName = event.target.innerText;

	const checkTarget = (characterCoordinates) => {
		if (
			characterCoordinates[0] >= x - 3 &&
			characterCoordinates[0] <= x + 3 &&
			characterCoordinates[1] >= y - 3 &&
			characterCoordinates[1] <= y + 3
		) {
			return true;
		} else {
			return false;
		}
	};

	const selectedCharacter = gameCharacters.characters.filter(
		(character) => character.name === characterName
	);


	return checkTarget(selectedCharacter[0].coordinates);
}
