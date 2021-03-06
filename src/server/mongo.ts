import { MongoClient, Db, Collection } from 'mongodb';
import { PokeData } from 'src/client/scripts/manager';

export function create() {
    const uri = 'mongodb+srv://yahav9:buba2017@cluster0.hae7i1f.mongodb.net/?retryWrites=true&w=majority';
    const client = new MongoClient(uri);
    return client;
}

export async function connect(client: MongoClient) {
    await client.connect();
    const db: Db = client.db('Pokedex-Project');
    const collection: Collection<PokeData> = db.collection('PokeData');
    return collection;
}

export async function getPokeData(collection: Collection<PokeData>, offset: number) {
    const cursor = collection.find({})
        .sort({ id: 1 })
        .skip(offset)
        .limit(20)
        .toArray();
    return await cursor;
}

export async function getDataForPokemonPage(collection: Collection<PokeData>, id: number) {
    const data = collection.findOne({ 'id': id });
    return await data;
}

export async function getPokemonsViaSearchBar(collection: Collection<PokeData>, str: string, offset: number) {
    const cursor = collection.find({ 'name': { $regex: str } })
        .sort({ id: 1 })
        .skip(offset)
        .limit(20)
        .toArray();
    return await cursor;
}
