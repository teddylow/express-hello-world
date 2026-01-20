// Import Express.js
const express = require('express');

// Create an Express app
const app = express();
const forward_url = "https://cliq.zoho.com/api/v2/bots/whatsappstatus/incoming?zapikey=1001.d0b1df574913b4a026c66322a9f2d8d7.fa75a03521a23ddad04fd78cbf1c4f70";


// Middleware to parse JSON bodies
app.use(express.json());

// Set port and verify_token
const port = process.env.PORT || 3000;
const verifyToken = process.env.VERIFY_TOKEN;

// Route for GET requests
app.get('/', (req, res) => {
  const { 'hub.mode': mode, 'hub.challenge': challenge, 'hub.verify_token': token } = req.query;

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('WEBHOOK VERIFIED');
    res.status(200).send(challenge);
  } else {
    res.status(403).end();
  }
});

// Route for POST requests
app.post('/', (req, res) => {
  const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
  console.log(`\n\nWebhook received ${timestamp}\n`);
  console.log(JSON.stringify(req.body, null, 2));
  res.status(200).end();
  if(res.status === 200){
    const response = (forward_url, req.body, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }};


// Start the server
app.listen(port, () => {
  console.log(`\nListening on port ${port}\n`);
});
