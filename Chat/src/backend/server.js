const express = require('express');
const app = express();
app.use(express.static('public'));

const keyPhraseExtraction = require('./helpers/keyPhrase');
const parseText = require('./helpers/parseText');

async function getQuiz(rawText) {
    let keywords = await keyPhraseExtraction(rawText);
    let blankedOut = parseText.fillInWithBlank(rawText, keywords);
    let questions = parseText.questionGenerator(blankedOut, keywords);
    return questions;
}

async function mains() {
    const rawText = 'I am going to the mall today with my friends.';
    let quiz = await getQuiz(rawText);
    return quiz
}
tempVar = mains();

module.exports = async function main() {
    return tempVar


}