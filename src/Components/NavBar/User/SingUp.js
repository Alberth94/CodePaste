import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import './SingUp.css';

function SingUp({setUserOn}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageStyle, setMessageStyle] = useState({});


  const handleSignUp = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setMessage('Registration successful. You are ON!');
        setUserOn(true);
        setMessageStyle({
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(255, 255, 255, 0.5)',
          color: '#00FF00',
          fontSize: '19px'
        });
    })
      .catch((error) => {
        setMessageStyle({
          fontWeight: 'bold',
          textShadow: '1px 1px 2px #fafafa',
          color: '#eb2632',
          fontSize: '19px'
        });
        const errorCode = error.code;
        if (errorCode === 'auth/email-already-in-use') {
          setMessage('User already exists with this email address!');
        } else {
          const errorMessage = error.message;
          console.log(errorMessage);
        }
    });
  }

  return (
    <div className='join-us'>
      <h2 style={{textAlign: 'center', color:'white'}}>SING UP</h2>
          <Form className="form-signup" onSubmit={handleSignUp}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label className="form-label">Email address</Form.Label>
              <Form.Control className="form-control" type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label className="form-label">Password</Form.Label>
              <Form.Control className="form-control" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicPasswordConfirm">
              <Form.Label className="form-label">Confirm Password</Form.Label>
              <Form.Control className="form-control" type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
            </Form.Group>
              <p className="error-message" style={messageStyle}>{message}</p>
            <Button variant="primary" type="submit" className="singup-form-button">
              Submit
            </Button>
        </Form>
    </div>
  );
}

export default SingUp;