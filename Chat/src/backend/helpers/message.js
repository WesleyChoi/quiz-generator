const keyPhraseExtraction = require('./keyPhrase');
const parseText = require('./parseText');

function test() {
    const express = require('express');
    const bodyParser = require('body-parser');
    const router = express.Router();
    const app = express();
    var twilioapi = require('../../public-keys/twilio-api');
    const accountSid = twilioapi.sid;
    const authToken = twilioapi.authToken;

    const client = require('twilio')(accountSid, authToken);

    //Here we are configuring express to use body-parser as middle-ware.
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    const notes = 'I am at the mall with my friends today.';

    function sendMessage(message) {
        client.messages
            .create({ from: twilioapi.phoneNumber, body: message, to: '+16048622741' })
            .then(message => console.log(message.sid));
    }

    async function getQuiz(rawText) {
        let keywords = await keyPhraseExtraction(rawText);
        let blankedOut = parseText.fillInWithBlank(rawText, keywords);
        let questions = parseText.questionGenerator(blankedOut, keywords);
        return questions;
    }

    let questions = getQuiz(notes);
    let i = 0;
    sendMessage(questions[i]);
    i++;


    app.post('/', (request, response) => {

        console.log(response, request);
    });

    // add router in the Express app.
    app.use('/', router);
    app.listen(8080, () => {
        console.log('Started on PORT 8080');
    });
}
test();