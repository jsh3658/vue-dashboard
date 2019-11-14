const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/api/list', (req, res) => {
   fs.readFile('data', 'utf8', (err, data) => {
       res.send(JSON.parse(data));
   });
});


app.listen(port);