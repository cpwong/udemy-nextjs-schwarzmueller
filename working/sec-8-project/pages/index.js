import { useRef, useState } from "react";

export default function HomePage() {
  const [feedbackItems, setFeedbackItems] = useState([]);

  const emailRef = useRef();
  const feedbackRef = useRef()
  
  const submitFormHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredFeedback = feedbackRef.current.value;
    const reqBody = { email:enteredEmail, text: enteredFeedback };

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers:  {
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  const loadFeedbackHandler = (e) => {
    fetch('/api/feedback') 
      .then((response) => response.json())
      .then((data) => {
        setFeedbackItems(data.feedback); 
      });
  }

  return (
    <>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor='email'>Email address</label>
          <input type='email' id='email' ref={emailRef}/>
        </div>
        <div>
          <label htmlFor='feedback'>Feedback</label>
          <textarea id='feedback' rows='5' ref={feedbackRef} />
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load Feedback</button>
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </>
  );
}

