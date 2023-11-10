import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, name, message } = req.body;

    // Validate form inputs
    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !message ||
      message.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input! ' });
      return;
    }

    // Store it in the database
    const newMessage = {
      email,
      name,
      message,
    };

    let client;
    try {
      client = await MongoClient.connect(process.env.MONGODB_URL);
    } catch (error) {
      res.status(500).json({ message: 'ERROR: Could not connect to MongoDB!' });
      return;
    }

    const db = client.db();

    try {
      const result = await db.collection('messages').insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({ message: 'ERROR: Could not store message!' });
      return;
    }
    client.close();
    res
      .status(201)
      .json({ message: 'Message successfully sent', message: newMessage });
  }
}
