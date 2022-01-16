const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();

app.post('/sms', (req, res) => {
    console.log(req.body);
    const twiml = new MessagingResponse();

    twiml.message('The Robots are coming! Head for the hills!');

    res.send(`
    <Response>
        <Message>
            Hello, Hi
        </Message>
    </Response>
    `)
});

http.createServer(app).listen(1337, () => {
    console.log('Express server listening on port 1337');
});