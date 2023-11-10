import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from '../../../helpers/db-utils';

export default async function handler(req, res) {
  const eventId = req.query.eventId;
  console.log(eventId);

  // // Open MongDB connection
  // const client = await MongoClient.connect(
  //   'mongodb+srv://user:USLD6L7RcU1PCel2@cluster0.dcr6p.mongodb.net/events?retryWrites=true&w=majority'
  // );

  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: 'ERROR: Database connection failed! ' });
    client.close();
    return;
  }

  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    // Server-side validation
    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input' });
      client.close();
      return;
    }
    const newComment = {
      // id: new Date().toISOString(),
      eventId,
      email,
      name,
      text,
    };
    // const db = client.db();
    // const result = await db.collection('comments').insertOne(newComment);

    let result;
    try {
      result = await insertDocument(client, 'comments', newComment);
      newComment._id = result.insertedId;
      res.status(201).json({ message: 'Added comment.', comment: newComment });
    } catch (error) {
      res.status(500).json({ message: 'ERROR: Insert comment failed!' });
    }
  }

  if (req.method === 'GET') {
    //   const dummyList = [
    //     { id: 'C1', name: 'John', text: 'A first comment!' },
    //     { id: 'C2', name: 'Max', text: 'A second comment!' },
    //   ];
    //   console.log('GET request received:', dummyList);

    // const db = client.db();
    // const documents = await db
    //   .collection('comments')
    //   .find()
    //   .sort({ _id: -1 }) // Sort by id in descending order
    //   .toArray();
    try {
      const documents = await getAllDocuments(client, 'comments', { _id: -1 });
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: 'ERROR: Get comments failed!' });
    }
  }

  // Close MongoDB client connection
  client.close();
}
