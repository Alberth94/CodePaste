import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { app } from '../../FireBase';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import './AddPaste.css';
import { Link } from 'react-router-dom';
import { getAuth } from "firebase/auth";

const db = getFirestore(app);
const postCollectionRef = collection(db, 'posts');

function AddPaste({ userOn }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [messageStyle, setMessageStyle] = useState({});

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleAddPost = async () => {
    if (userOn) {
      const auth = getAuth(app);
      const user = auth.currentUser;
      try {
        await addDoc(postCollectionRef, {
          title: title,
          content: content,
          createdAt: new Date(),
          userEmail: user.email
        });
        setTitle('');
        setContent('');
        setMessage('Paste added successfully.');
        setMessageStyle({
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(255, 255, 255, 0.5)',
          color: '#00FF00'
        });
      } catch (error) {
        console.error(error);
        setMessage('An error occurred while adding the paste.');
        setMessageStyle({
          fontWeight: 'bold',
          textShadow: '1px 1px 2px rgba(255, 255, 255, 0.2)',
          color: '#27ae60'
        });
      }
    } else { 
      setMessage(<p>Please log in <Link to="/login">here</Link> to add a paste.</p>);
      setMessageStyle({
        fontWeight: 'bold',
        textShadow: '1px 1px 2px rgba(255, 255, 255, 0.2)',
        color: 'white'
      });
    }
  };

  return (<div className='post-page'>
    <h1 style={{textAlign: 'center', color:'white'}}> Add a paste</h1>
    <Form  className='title-post-form'>
      <p style={messageStyle}>{message}</p>
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={handleTitleChange}
        />
      </Form.Group>

      <Form.Group className='content-post-form' controlId="content">
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={content}
          onChange={handleContentChange}
        />
      </Form.Group>

      <Button className='add-post-button' variant="primary" onClick={handleAddPost}>
        Add Paste
      </Button>
      </Form>
      </div>
  );
}

export default AddPaste;