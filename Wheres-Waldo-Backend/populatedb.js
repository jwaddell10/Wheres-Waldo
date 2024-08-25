const mongoose = require("mongoose");
const Character = require("./models/character.js");
const Puzzle = require("./models/puzzle.js");
const cloudinary = require("cloudinary").v2;
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const { getImages } = require("./services/cloudinary.js")
const characters = [];
const puzzles = [];

const images = async () => {
    const variable = await getImages()
    const imageUrl = variable.resources.map((item) => item.secure_url)
    return imageUrl
}

const mongoDB = process.env.MONGODB_KEY;
main().catch((err) => console.log(err));
async function main() {
	await mongoose.connect(mongoDB);
	console.log("connected");

	await Promise.all([Puzzle.deleteMany(), Character.deleteMany()]);

	await createPuzzle();
	await createCharacter();
}

async function characterCreate(index, name, puzzle, coordinates) {
	const characterDetail = {
		name: name,
		puzzle: puzzle,
		coordinates: coordinates,
	};

	const character = new Character(characterDetail);
	await character.save();
	characters[index] = character;
	console.log(`Added character: ${character}`);
}

async function puzzleCreate(index, name, url) {
	const puzzleDetail = {
		name: name,
        url: url,
	};

	const puzzle = new Puzzle(puzzleDetail);
	await puzzle.save();
	puzzles[index] = puzzle;
	console.log(`Added puzzles: ${puzzle}`);
}

async function createPuzzle() {
    const imageUrl = await images()

	await Promise.all([
		puzzleCreate(0, "Waldo Beach", imageUrl[0]),
		puzzleCreate(1, "Waldo Downtown", imageUrl[1]),
		puzzleCreate(2, "Waldo Factory", imageUrl[2]),
	]);
}

async function createCharacter() {
	await Promise.all([
		characterCreate(0, "Waldo", puzzles[0], [364, 255]),
        characterCreate(1, "Waldo", puzzles[1], [101, 454]),
		characterCreate(2, "Waldo", puzzles[2], [50, 20]),
		characterCreate(0, "Wizard", puzzles[0], [428, 258]),
        characterCreate(1, "Wizard", puzzles[1], [338, 472]),
        characterCreate(0, "Odlaw", puzzles[0], [167, 253]),
        characterCreate(1, "Odlaw", puzzles[1], [267, 587]),
        characterCreate(2, "Odlaw", puzzles[2], [23, 68]),
        characterCreate(1, "Wenda", puzzles[1], [108, 360]),
        characterCreate(2, "Wenda", puzzles[2], [50, 88]),
	]);
}
