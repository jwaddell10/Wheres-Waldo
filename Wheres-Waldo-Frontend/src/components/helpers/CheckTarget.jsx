export default function CheckTarget(event, imageId, x, y, gameCharacters) {
	const characterName = event.target.innerText;

	const checkTarget = (characterCoordinates) => {
		if (
			characterCoordinates[0] >= x - 2 &&
			characterCoordinates[0] <= x + 2 &&
			characterCoordinates[1] >= y - 2 &&
			characterCoordinates[1] <= y + 2
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
