import React, { useState, useEffect } from 'react';
import '../styles/Progress.css';

const ProgressTracking = () => {
  const [data, setData] = useState({
    id: '', 
    date: '',
    weight: '',
    bodyMeasurements: '',
    notes: '',
  });
  const [progressData, setProgressData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  const handleTrackProgress = async (e) => {
    e.preventDefault();

    try {
      const authTokenUser = localStorage.getItem('authTokenUser');
      const method = isEditing ? 'PUT' : 'POST';
      const url = isEditing ? 
          `http://localhost:3001/api/trackProgress/${data.id}` 
          : 'http://localhost:3001/api/trackProgress';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authTokenUser,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        fetchProgressData();
        setIsEditing(false);
        console.log('Progress tracked successfully');
        alert('Progress tracked successfully');
      } else {
        console.error('Failed to track progress');
        // Handle error cases
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle error cases
    }
  };

  const fetchProgressData = async () => {
    try {
      const authTokenUser = localStorage.getItem('authTokenUser');
      const response = await fetch('http://localhost:3001/api/trackProgress', {
        method: 'GET',
        headers: {
          'Authorization': authTokenUser,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProgressData(data);
      } else {
        console.error('Failed to fetch progress data:', response.status, response.statusText);
        // Handle error cases
      }
    } catch (error) {
      console.error('An error occurred while fetching progress data:', error);
      // Handle error cases
    }
  };

  const handleRemoveProgress = async (id) => {
    try {
      const authTokenUser = localStorage.getItem('authTokenUser');
      const response = await fetch(`http://localhost:3001/api/trackProgress/${id}`, {
        method: 'DELETE', 
        headers: {
          'Authorization': authTokenUser,
        },
      });

      if (response.ok) {
        // Update the local state to remove the deleted entry
        setProgressData(progressData.filter(entry => entry.id !== id));
        console.log('Progress removed successfully');
      } else {
        console.error('Failed to remove progress');
      }
    } catch (error) {
      console.error('An error occurred while removing progress:', error);  
    }
  }; 

  const handleEditProgress = (entry) => {
    setData(entry);
    setIsEditing(true);
  }

  useEffect(() => {
    fetchProgressData();
  }, []);

  return (
    <div className="progress-tracking-container">
      <h2 className="progress-tracking-title">Fitness Progress Tracking</h2>
      <form className="progress-form">
        <div className="form-group">
          <label htmlFor="date" className="form-label">
            Date:
          </label>
          <input
            type="date"
            id="date"
            onChange={handleChange}
            value={data.date}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="weight" className="form-label">
            Weight (in kg):
          </label>
          <input
            type="number"
            id="weight"
            onChange={handleChange}
            value={data.weight}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="bodyMeasurements" className="form-label">
            Body Measurements:
          </label>
          <textarea
            rows="4"
            id="bodyMeasurements"
            onChange={handleChange}
            value={data.bodyMeasurements}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="notes" className="form-label">
            Notes:
          </label>
          <textarea
            rows="4"
            id="notes"
            onChange={handleChange}
            value={data.notes}
            className="form-input"
          />
        </div>
        <button onClick={handleTrackProgress} className="form-button">
          {isEditing ? 'Update Progress' : 'Track Progress'}
        </button>
      </form>

      <div className="progress-data-container">
        <h2 className="progress-data-title">Progress Data</h2>
        <div className="progress-data">
          <table className="progress-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Weight (kg)</th>
                <th>Body Measurements</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {progressData.length > 0 ? (
              progressData.map((entry) => (
                <ProgressDataRow 
                key={entry.id} entry={entry} 
                onRemove = {handleRemoveProgress}
                onEdit = {handleEditProgress}/>
              ))) : ( <tr>
                  <td className='no-progess-message'>
                    No progress tracked yet.
                  </td>
              </tr>)}
             
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const ProgressDataRow = ({ entry, onRemove, onEdit }) => {
  return (
    <tr>
      <td>{entry.date}</td>
      <td>{entry.weight} kg</td>
      <td>{entry.bodyMeasurements}</td>
      <td>{entry.notes}</td>
      <td>
      <button onClick={() => onEdit(entry)}
          className="edit-btn">
          Edit
        </button>

        <button onClick={() => onRemove(entry.id)}
          className="remove-btn">
          Remove
        </button>
      </td>
    </tr>
  );
};

export default ProgressTracking;