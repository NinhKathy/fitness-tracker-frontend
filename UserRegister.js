import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UserRegister.css'; 


const UserRegister = () => {
  const [data, setData] = useState({
    name: '',
    age: '', 
    gender: '',
    height: '',
    weight: '',
    email: '',
    contactNumber: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const handleSaveProfile = async (e) => {
    e.preventDefault();

    if (!data.name || !data.age || !data.gender || !data.height || !data.weight || !data.email || !data.contactNumber || !data.password) {
      alert('Please fill out all fields.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://fitlife-companion11.onrender.com/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('User profile created successfully');
        alert("User profile created successfully")
        navigate("/user-login")
      } else {
        console.error('Failed to create user profile');
        alert('Failed to create user profile. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };


  return (
    <div className="user-profile-container">
      <h2 className="user-profile-title">User Profile</h2>
      <form onSubmit={handleSaveProfile}> 
        {/* Form Fields */}
        {isLoading && <div>Loading...</div>}

        <div className="form-group" method="POST">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            className="form-input"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age" className="form-label">
            Age:
          </label>
          <input
            type="number"
            id="age"
            className="form-input"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender" className="form-label">
            Gender:
          </label>
          <select id="gender" className="form-input" onChange={handleChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="height" className="form-label">
            Height: (in cm)
          </label>
          <input
            type="number"
            id="height"
            className="form-input"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="weight" className="form-label">
            Weight:
          </label>
          <input
            type="number"
            id="weight"
            className="form-input"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="form-input"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactNumber" className="form-label">
            Contact Number:
          </label>
          <input
            type="text"
            id="contactNumber"
            className="form-input"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="form-input"
            onChange={handleChange}
            autoComplete="current-password"
          />
        </div>
        <button
          type='submit'
          className="form-button"
        >
          Save Profile
        </button>
       <br />
        <a href='/user-login'>Already registered? Login here</a>
      </form>
    </div>
  );
};

export default UserRegister;