const mongoose = require("mongoose");
const Character = require("./models/character.js");
const Puzzle = require("./models/puzzle.js")

const characters = [];
const puzzles = [];

async function createCharacter(index, name, puzzle, coordinates) {
	const characterDetail = {
		name: name,
		puzzle: puzzle,
		coordinates: coordinates,
	};

	const character = new Character(characterDetail);
	await character.save();
	characters[index] = character;
    console.log(`Added character: ${character}`)
}

async function createPuzzle(index, name, character) {
    const puzzleDetail = {
        name: name,
        character: character
    }

    const puzzle = new Puzzle(puzzleDetail)
    await puzzle.save();
    puzzles[index] = puzzle
    console.log(`Added puzzles: ${puzzle}`)
}