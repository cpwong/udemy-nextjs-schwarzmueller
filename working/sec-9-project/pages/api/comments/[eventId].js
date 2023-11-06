export default function handler(req, res) {
  const eventId = req.query.eventId;
  console.log(eventId);

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
      return;
    }
    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
    }
    console.log(email, name, text);
    res.status(201).json({ message: 'Added comment.', comment: newComment });
  }

  if (req.method === 'GET') {
    const dummyList = [
      { id: 'C1', name: 'John', text: 'A first comment!' },
      { id: 'C2', name: 'Max', text: 'A second comment!' },
    ]
    console.log('GET request received:', dummyList);
    res.status(200).json({ comments: dummyList });
  }
}
