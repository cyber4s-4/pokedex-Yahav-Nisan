// import fs from 'fs';
import path from 'path';
import express, { Express } from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { Collection } from 'mongodb';
import { create, connect, getPokeData, getDataForPokemonPage, getPokemonsViaSearchBar } from './mongo';
import { PokeData } from 'src/client/scripts/manager';

// let offset: number = 0;
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

// @ts-ignore
app.get('/', (req, res) => {
  res.sendFile(path.join(root, 'index.html'));
});

// @ts-ignore
app.get('/pokemon', (req, res) => {
  res.sendFile(path.join(root, 'pokemon.html'));
});

// @ts-ignore
app.get('/pokedata', async (req, res) => {
  if (req.query.id !== undefined) {
    const data = await getDataForPokemonPage(collection, Number(req.query.id));
    res.send(data);
  } else if (req.query.name !== undefined) {
    const data = await getPokemonsViaSearchBar(collection, req.query.name.toString(), Number(req.query.offset));
    res.send(data);
  } else {
    const data = await getPokeData(collection, Number(req.query.offset));
    res.send(data);
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('Hosted: http://localhost:' + port);
});
