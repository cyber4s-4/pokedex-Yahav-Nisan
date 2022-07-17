// import fs from 'fs';
import path from 'path';
import express, { Express } from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { Collection } from 'mongodb';
import { create, connect, getItems as getPokeData } from './mongo';
import { PokeData } from 'src/client/scripts/manager';

const app: Express = express();
app.use(cors());
app.use(json());
const root: string = path.join(process.cwd(), 'dist');
// @ts-ignore
let collection: Collection<PokeData>;
connect(create()).then(res => {
  collection = res;
});


app.use(express.static(root));

// // @ts-ignore
// app.post('/add', (req, res) => {
//   console.log("Add " + req.body.name);
//   // TODO - add the requested item to mongo
//   res.end(); // Temporary
// });

// // @ts-ignore
// app.get('/get', (req, res) => {
//   console.log("Get");
//   // TODO - get items from mongo and return them via res
//   res.json([]); // Temporary
// });

// // @ts-ignore
// app.get('/clear', (req, res) => {
//   console.log("Clear");
//   // TODO - delete everything stored in mongo
//   res.end(); // Temporary
// });

// // @ts-ignore
// app.get('*', (req, res) => {
//   res.sendFile(path.join(root, 'index.html'));
// });

//@ts-ignore
app.get('/', (req, res) => {
  res.sendFile(path.join(root, 'index.html'));
});

//@ts-ignore
app.get('/pokemon', (req, res) => {
  res.sendFile(path.join(root, 'pokemon.html'));
});

// const filePath = path.join(__dirname, "./data.json");
// const readFileData = JSON.parse(fs.readFileSync(filePath, "utf8"));

//@ts-ignore
app.get("/pokedata", async (req, res) => {
  const data = await getPokeData(collection);
  res.send(data);
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('Hosted: http://localhost:' + port);
});
