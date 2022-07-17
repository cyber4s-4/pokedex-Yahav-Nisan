// import { MongoClient, Db, Collection/*, WithId*/ } from 'mongodb';

// export function create() {
//   // TODO - Replace with your own mongo url
//   const uri = "mongodb+srv://test-mongo:PByEK11GMs8c6dEi@cluster0.vs8nc.mongodb.net/?retryWrites=true&w=majority";
//   const client = new MongoClient(uri);
//   return client;
// }

// export async function connect(client: MongoClient) {
//   await client.connect();
//   const db: Db = client.db('bootcamp');
//   const collection: Collection<Item> = db.collection('shop');
//   return collection;
// }

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
