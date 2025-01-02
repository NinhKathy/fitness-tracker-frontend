import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function UserLogin() {
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const [btn, setBtn] = useState(true);
  const navigate = useNavigate();

  
  const handleSaveUser = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      alert('Please fill out all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseBody = await response.json();
        const authTokenUser = responseBody.token;

        localStorage.setItem('authTokenUser', authTokenUser);

        console.log('Login Successful');
        alert("Login Successful")
        navigate("/")
      } else {
        console.error('Failed to login');
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleSaveTrainer = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!data.email || !data.password) {
      alert('Please fill out all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/TrainerProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseBody = await response.json();
        const authTokenTrainer = responseBody.token;

        localStorage.setItem('authTokentrainer', authTokenTrainer);

        console.log('Login Successful');
        alert("Login Successful")
        navigate("/workout-plan")
      } else {
        console.error('Failed to login');
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  const buttonClick = () => {
    setBtn(!btn);
    setData({ email: '', password: '' });
  };

  return (
    <div>
      <div className="toggle-button-container">
      <button className="toggle-button" onClick={buttonClick}>
        {btn ? 'Login As A User' : 'Login As A Trainer'}
      </button>
      <br />
    </div>
      <div className="user-profile-container">
        {btn ? (
          <div>
            <h2>User Login</h2>
            <form className="form-group" 
                action="/user-login" method="POST">
              <div className="form-group">
                <label>Email:</label>
                <input 
                    type="email" 
                    id="email" 
                    onChange={handleChange} 
                    placeholder='Email'
                    autoComplete='username'
                    required
                    value={data.email}/>
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input 
                    type="password" 
                    id="password" 
                    onChange={handleChange} 
                    placeholder='Password'
                    autoComplete='current-password'
                    required
                    value={data.password}/>
              </div>
              <button onClick={handleSaveUser}>Login</button>
              <Link to="/user-register">
              <p>Don't have an account? SignUp</p>
              </Link>
            </form>
          </div>
        ) : (
          <div>
            <h2>Trainer Login</h2>
            <form className="form-group">
              <div className="form-group">
                <label>Email:</label>
                <input type="email" id="email" onChange={handleChange} autoComplete='username'/>
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input type="password" id="password" onChange={handleChange} autoComplete='current-password'/>
              </div>
              <button onClick={handleSaveTrainer}>Login</button>
              <Link to="/TrainerProfile">
                <p>Don't have an account? SignUp</p>
              </Link>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserLogin;



