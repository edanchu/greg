import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    if (validateForm())
      axios
        .post('/api/user/login', {
          email: email,
          password: password,
        })
        .then((res) => {
          console.log(res);
          setUser(res.data.user);
          //return navigate('/UserPage');
        })
        .catch((err) => {
          console.log(err);
        });
  }

  function validateForm() {
    if (email.length <= 0 || password.length <= 0) {
      toast.error('Email and Password must be at least 1 character');
      return false;
    }
    return true;
  }

  return (
    <div className='Login'>
      <div className='login-box'>
        <h1 className='top-header'> Login </h1>
      <Form onSubmit={handleSubmit}>
        <p className='header'> Email </p>
        <Form.Group controlId='email' className='input-box'>
          <Form.Control
            className='input-box2'
            autoFocus
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <p className='header'> Password </p>
        <Form.Group controlId='password' className='input-box'>
          <Form.Control
            className='input-box2'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button className='login-button' type='submit'>
          Login
        </Button>
        <ToastContainer />
        <Link to='/Sign-Up' className='login-link'>
          <Button className='SignUp-button' type='submit'>
            Don't have an account? Sign up!
          </Button>
        </Link>
      </Form>
      </div>
    </div>
  );
}
