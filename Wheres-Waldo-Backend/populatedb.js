const mongoose = require("mongoose");
const Character = require("./models/character.js");
const Puzzle = require("./models/puzzle.js");
const cloudinary = require("cloudinary");
require("dotenv").config();

const characters = [];
const puzzles = [];

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

async function puzzleCreate(index, name) {
	const puzzleDetail = {
		name: name,
	};

	const puzzle = new Puzzle(puzzleDetail);
	await puzzle.save();
	puzzles[index] = puzzle;
	console.log(`Added puzzles: ${puzzle}`);
}

// async function createCharacter() {
//     console.log('adding characters');
//     await Promise.all([
//         characterCreate(0, "Waldo", puzzles, )
//     ])
// }

async function createWaldoCharacters(puzzles) {
    const waldoCoordinates = [
        {x: 362, y: 251},
        {x: 101, y: 454},
        {x: 341, y: 99},
    ]

    const waldoCharacters = puzzles.map((puzzle, index) => ({
        name: "Waldo",
        puzzle: {
            type: puzzle._id,
            coordinates: waldoCoordinates[index],
        }
    }));

    const createdCharacters = await Character.insertMany(waldoCharacters)
    createdCharacters.forEach(character => {
        console.log(`Added character: ${JSON.stringify(character)}`);
    });

    return createdCharacters;
}

async function createPuzzle() {
	await Promise.all([
		puzzleCreate(0, "Waldo Beach"),
		puzzleCreate(1, "Waldo Downtown"),
		puzzleCreate(2, "Waldo Factory"),
	]);
}

async function createCharacter() {
    await Promise.all([
        // characterCreate(index, name puzzle coords)
        characterCreate(0, "Waldo", puzzles[0], [364, 255])
    ])
}
