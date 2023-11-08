import { MongoClient } from 'mongodb';

export async function connectDatabase() {
  // Open MongDB connection
  const client = await MongoClient.connect(
    'mongodb+srv://user:USLD6L7RcU1PCel2@cluster0.dcr6p.mongodb.net/events?retryWrites=true&w=majority'
  );
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db();
  const documents = await db.collection(collection).find().sort(sort).toArray();
  return documents;
}
