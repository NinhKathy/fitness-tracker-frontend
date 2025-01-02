import React, { useState, useEffect } from 'react';
import '../styles/Goal.css';

const SetGoal = () => {
  const [data, setData] = useState({ 
    id: '',
    goalType: '',
    target: '',
    timeline: '',
  });

  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  const validateForm = () => {
    const { goalType, target, timeline } = data;
    if (!goalType || !target || !timeline) {
      alert('Please fill in all fields.');
      return false; 
    }
    return true;
  };
  
  const handleSetGoal = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    
    try {
      const authTokenUser = localStorage.getItem('authTokenUser');
      setLoading(true);
      const method = isEditing ? 'PUT' : 'POST';
      const url = isEditing 
        ? `http://localhost:3001/api/goals/${data.id}`
        : 'http://localhost:3001/api/goals';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authTokenUser,
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const newGoal = await response.json();
        setData({ id: newGoal.id, goalType: '', target: '', timeline: '' });
        fetchGoals();
        setSuccessMsg(isEditing ? 'Goal updated successfully' : 'Goal set successfully');
        setIsEditing(false);
       
      } else {
        throw new Error(isEditing ? 'Failed to update goal' : 'Failed to set goal');
        // Handle error cases
      }
    } catch (error) {
      setError(error.message);
      // Handle error cases
    } finally {
      setLoading(false);
    }
  };
  
  const fetchGoals = async () => {
    try {
      const authTokenUser = localStorage.getItem('authTokenUser');
      const response = await fetch('http://localhost:3001/api/goals', {
        method: 'GET',
        headers: {
          'Authorization': authTokenUser,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        setGoals(data);
      } else {
        console.error('Failed to fetch goals:');
        // Handle error cases
      }
    } catch (error) {
      setError(error.message);
      // Handle error cases
    } finally {
      setLoading(false);
    }
  };

  // handles goal deletion 
  const handleDeleteGoal = async (id) => {
    try {
      const authTokenUser = localStorage.getItem('authTokenUser');
      const response = await fetch (`http://localhost:3001/api/goals/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': authTokenUser,
        },
      });

      if (response.ok) {
        setGoals(goals.filter(goal => goal.id !== id));
        setSuccessMsg('Goal deleted successfully');
      } else {
        throw new Error('Failed to delete goal');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // handle editing goal
  const handleEditGoal = (goal) => {
    setData(goal);
    setIsEditing(true);
  }
  
  useEffect(() => {
    fetchGoals();
  }, []);
  
  return (
    <div className="goal-setting-container">
      <h2 className="goal-setting-title">Set Fitness Goal</h2>
      {error && <div className="error-message">{error}</div>} {/* Display error message */}
      {successMsg && <div className="success-message">{successMsg}</div>}
      
      <form className="goal-setting-form">
        <div className="form-group">
          <label htmlFor="goalType" className="form-label">
            Goal Type:
          </label>
          <select
            id="goalType"
            value={data.goalType}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Select</option>
            <option value="Weight Loss">Weight Loss</option>
            <option value="Muscle Gain">Muscle Gain</option>
            <option value="Endurance">Endurance</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="target" className="form-label">
            Target:
          </label>
          <input
            type="text"
            id="target"
            value={data.target}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="timeline" className="form-label">
            Timeline:
          </label>
          <input
            type="text"
            id="timeline"
            value={data.timeline}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <button onClick={handleSetGoal} className="form-button" disabled={loading}>
          {loading ? 'Setting Goal...' : isEditing ? 'Update Goal' : 'Set Goal'}
        </button>
      </form>
  
      <div className="goal-cards-container">
        <h2 className="goal-setting-title">My Goals</h2>
        <div className="goal-cards">
          {goals.length > 0 ? (
            goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} 
            onDelete={handleDeleteGoal}
            onEdit={handleEditGoal}/>
          ))) : ( <p>No goals set yet.</p>)}
        </div>
      </div>
    </div>
  );
};

const GoalCard = ({ goal, onDelete, onEdit }) => {
  return (
    <div className="goal-card">
      <p> <b>Goal Type:</b> {goal.goalType} </p>
      <p> <b>Target:</b> {goal.target}</p>
      <p> <b>Timeline:</b> {goal.timeline}</p>
      <div className="goal-card-actions">
        <button onClick={() => onEdit(goal)} className="edit-btn">
          Edit
        </button>
        <button onClick={() => onDelete(goal.id)} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
};

export default SetGoal;