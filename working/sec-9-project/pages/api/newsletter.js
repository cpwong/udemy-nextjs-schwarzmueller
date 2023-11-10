// import { MongoClient } from 'mongodb';
import { connectDatabase, insertDocument } from '../../helpers/db-utils';

// async function connectDatabase() {
//   // Open MongoDB connection
//   const client = await MongoClient.connect(
//     'mongodb+srv://user:USLD6L7RcU1PCel2@cluster0.dcr6p.mongodb.net/events?retryWrites=true&w=majority'
//   );
//   return client;
// }
 
// async function insertDocument(client, document) {
//   const db = client.db();
//   await db.collection('newsletter').insertOne(document); 
// }

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    // Open MongoDB connection
    let client;
    
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: 'ERROR: connectDatabase failed!' });
      client.close();
      return;
    }

    try {
      await insertDocument(client, 'newsletter', { email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({ message: 'ERROR: insertDocument failed!' });
      client.close();
      return;      
    }
    
    // Close MongoDB connection
    client.close();

    res.status(201).json({ message: 'Signed up!' });
  }
}
