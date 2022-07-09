const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const portHttp = 4000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

const root = path.join(process.cwd(), 'dist');
app.use(express.static(root), (req, res, next) => {
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(root, 'index.html'));
});

const filePath = path.join(__dirname, "./data.json");
const readFileData = JSON.parse(fs.readFileSync(filePath, "utf8"));

app.get("/pokedata", (req, res) => {
  res.status(200).send(readFileData);
});


app.listen(portHttp, () => {
  console.log('Hosted: http://localhost:' + portHttp);
});
