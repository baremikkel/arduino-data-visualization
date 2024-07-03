// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
let data = [];
app.use(bodyParser.json());

//post data to the api
app.post('/api/data', (req, res) => {
  data.push(req.body);
  console.log('Received data:', data);
  res.send('Data received');
});
//get the data from the api
app.get('/api/data', (req, res) => {
  // Example response for the GET request
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
