var twilioapi = require('../../public-keys/twilio-api');
const accountSid = twilioapi.sid;
const authToken = twilioapi.authToken;

const client = require('twilio')(accountSid, authToken);

module.exports = {
    sendMessage: function sendMessage(message) {
        client.messages
            .create({ from: twilioapi.phoneNumber, body: message, to: '+16048622741' })
            .then(message => console.log(message.sid));
    },



}

function test(context, event, callback) {
    const http = require('http');
    const express = require('express');
    const MessagingResponse = require('twilio').twiml.MessagingResponse;

    const app = express();

    app.post('/sms', (req, res) => {
        const twiml = new MessagingResponse();

        twiml.message('The Robots are coming! Head for the hills!');

        res.writeHead(200, { 'Content-Type': 'text/xml' });
        res.end(twiml.toString());
    });

    http.createServer(app).listen(1337, () => {
        console.log('Express server listening on port 1337');
    });

};
test()