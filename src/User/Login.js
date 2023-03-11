import { Form, Button} from "react-bootstrap";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import './Login.css';
import { Link } from "react-router-dom";

function Login({setUserOn}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageStyle, setMessageStyle] = useState({});

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("Login successful. You are ON!");
      setMessageStyle({
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(255, 255, 255, 0.5)',
        color: '#00FF00'
      });
      setUserOn(true);
    } catch (error) {
      setMessageStyle({
        fontWeight: 'bold',
        textShadow: '1px 1px 2px #fafafa',
        color: '#eb2632',
        fontSize: '19px'
      });
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === "auth/user-not-found") {
        setMessage(<>There is no account with this email address, sign up <Link to="/signup">here</Link></>);
      } else if (errorCode === "auth/wrong-password") {
        setMessage("The password is incorrect. Please try again.");
      }
      console.log(errorMessage);
    }
  };

  return (
    <div className="login-container">
      <h2 style={{color: 'white'}}>LOGIN</h2>
      <h3 style={{textAlign:'center', color:'black'}}>Login</h3>
    <Form className="login-form" onSubmit={handleLogin}>
        <Form.Group controlId="formBasicEmail">
        <Form.Label className="form-label">Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} className="login-form-input" />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label className="form-label">Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="login-form-input" />
        </Form.Group>
         <p style={messageStyle}>{message}</p>
      <Button variant="primary" type="submit" className="login-form-button">
        Login
      </Button>
    </Form>
  </div>
  );
}

export default Login;