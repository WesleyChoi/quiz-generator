var twilioapi = require('../public-keys/twilio-api');
const accountSid = twilioapi.sid;
const authToken = twilioapi.authToken;

const client = require('twilio')(accountSid, authToken);

function sendMessage(message) {
    client.messages
        .create({ from: twilioapi.phoneNumber, body: message, to: '+16048622741' })
        .then((message) => console.log(message.sid));
}

const main = require('./server');

function test(context, event, callback) {
    'use strict';

    const express = require('express');
    const bodyParser = require('body-parser');

    // Create a new instance of express
    const app = express();

    // Tell express to use the body-parser middleware and to not parse extended bodies
    app.use(bodyParser.urlencoded({ extended: false }));

    // Route that receives a POST request to /sms
    app.post('/', function (req, res) {
        res.send("Welcome to Quiz-Me!");

        sendMessage("Welcome!")


    });

    // Tell our app to listen on port 3000
    app.listen(8080, function (err) {
        if (err) {
            throw err;
        }

        console.log('Server started on port 8080');
    });
}
test();