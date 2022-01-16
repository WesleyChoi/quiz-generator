const express = require("express");
const app = express();
app.use(express.static('public'))

keyPhraseExtraction = require("./helpers/keyPhrase");
parseText = require("./helpers/parseText");

async function getQuiz(rawText) {
    const keywords = await keyPhraseExtraction(rawText);
    const blankedOut = parseText.fillInWithBlank(rawText, keywords);
    const questions = parseText.questionGenerator(blankedOut, keywords);
    return questions;
}

async function main() {
    rawText = "I am going to the mall today with my friends.";
    quiz = await getQuiz(rawText);

}


main();