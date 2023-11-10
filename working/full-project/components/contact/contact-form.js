import { useEffect, useState } from 'react';
import styles from './contact-form.module.css';
import Notification from '../ui/notification';

async function sendContactData(contactDetails) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(contactDetails),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }
}

export default function ContactForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(); // 'pending', 'success', 'error'
  const [error, setError] = useState();

  useEffect(() => {
    if (status === 'success' || status === 'error') {
      const timer = setTimeout(() => {
        setStatus(null);
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  async function sendMessageHandler(e) {
    e.preventDefault();

    setStatus('pending');
    try {
      await sendContactData({
        email: email,
        name: name,
        message: message,
      });
      setStatus('success');
      setEmail('');
      setName('');
      setMessage('');
    } catch (error) {
      setError(error.message)
      setStatus('error');
    }
  }
  
  let notification;
  if (status === 'pending') {
    notification = {
      status: 'pending',
      title: 'Sending message...',
      message: 'Your message is on its way!'
    }
  }
  if (status === 'success') {
    notification = {
      status: 'success',
      title: 'Success!',
      message: 'Message sent successfully!'
    }
  }
  if (status === 'error') {
    notification = {
      status: 'error',
      title: 'ERROR!',
      message: error
    }
  }

  return (
    <section className={styles.contact}>
      <h1>How can I help you?</h1>
      <form className={styles.form} onSubmit={sendMessageHandler}>
        <div className={styles.controls}>
          <div className={styles.control}>
            <label htmlFor='email'>Your Email</label>
            <input
              type='email'
              id='email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.control}>
            <label htmlFor='name'>Your Name</label>
            <input
              type='text'
              id='name'
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.control}>
          <label htmlFor='message'>Message</label>
          <textarea
            id='message'
            rows='5'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className={styles.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && (
        <Notification 
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
}
