import { MongoClient, Db, Collection/*, WithId*/ } from 'mongodb';
import { PokeData } from 'src/client/scripts/manager';

export function create() {
    const uri = "mongodb+srv://yahav9:buba2017@cluster0.hae7i1f.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    return client;
}

export async function connect(client: MongoClient) {
    await client.connect();
    const db: Db = client.db('Pokedex-Project');
    const collection: Collection<PokeData> = db.collection('PokeData');
    return collection;
}

// // @ts-ignore
// export async function addItem(name: string, collection: Collection<Item>) {
//   // TODO - add the item to mongo (via collection)
// }

// // @ts-ignore
// export async function getItems(collection: Collection<Item>) {
//   // TODO - get the items from mongo (via collection)
//   return []; // Temporary
// }

// // @ts-ignore
// export async function clearItems(collection: Collection<Item>) {
//   // TODO - delete all the items from mongo (via collection)
// }
