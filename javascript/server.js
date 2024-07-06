const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
let data = [];
app.use(bodyParser.json());

// Post data to the API
app.post('/api/data', (req, res) => {
  data.push(req.body);
  console.log('Received data:', data);
  res.send('Data received');
});

// Get the data from the API
app.get('/api/data', (req, res) => {
  res.json(data);
});

// Clear all the data received
app.delete('/api/data', (req, res) => {
  data = [];
  console.log('Data cleared');
  res.send('All data cleared');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
