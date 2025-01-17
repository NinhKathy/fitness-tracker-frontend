import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TrainerRegister.css';


const TrainerProfile = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const handleSaveProfile = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://fitlife-companion11.onrender.com/trainer/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Trainer profile created successfully');
        alert("Trainer profile created successfully")
        navigate("/user-login")
      } else {
        console.error('Failed to create trainer profile');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  return (
    <div className="user-profile-container">
      <h2 className="user-profile-title">Trainer Profile</h2>
      <form>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            className="form-input"
            onChange={handleChange}
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
          <label htmlFor="specialization" className="form-label">
            Specialization:
          </label>
          <input
            type="text"
            id="specialization"
            className="form-input"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="experience" className="form-label">
            Experience:
          </label>
          <input
            type="number"
            id="experience"
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
          />
        </div>
        <button
          onClick={handleSaveProfile}
          className="form-button"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default TrainerProfile;