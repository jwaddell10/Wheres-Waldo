export default function CheckTarget(event, imageId, x, y, gameCharacters) {
	const characterName = event.target.innerText;

	const checkTarget = (characterCoordinates) => {
		if (
			characterCoordinates[0] >= x - 5 &&
			characterCoordinates[0] <= x + 5 &&
			characterCoordinates[1] >= y - 5 &&
			characterCoordinates[1] <= y + 5
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
