const { SerialPort } = require('serialport')
const express = require('express');
const { MessagingResponse } = require('twilio').twiml;
const { urlencoded } = require('body-parser');

const app = express();
app.use(urlencoded({ extended: false }));

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();
  console.log(`Incoming message: ${req.body.Body}`);
  const port = new SerialPort({ path: '/COM4', baudRate: 9600 }, function (err) {
    if (err) {
      return console.log('Error: ', err.message)
    }
  })
  
  port.write(req.body.Body, function(err) {
    if (err) {
      return console.log('Error on write: ', err.message)
    }
    console.log('message written \n')
  })

  twiml.message('Message sent to Christian he should response soon, check the LED screen!');

  res.type('text/xml').send(twiml.toString());
});

app.listen(1337, () => {
  console.log('Express server listening on port 3000');
});



