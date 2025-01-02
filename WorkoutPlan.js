import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../styles/WorkoutPlan.css';

const WorkoutPlan = () => {
  const [data, setData] = useState({
    id: '',
    name: '',
    type: '',
    muscle: '',
    equipment: '',
    difficulty: '',
    instructions: '',
  });

  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const openModal = () => {
    setShowForm(true);
  };

  const closeModal = () => {
    setShowForm(false);
  };

  async function fetchWorkoutPlans() {
  try {
    // const authTokenTrainer = localStorage.getItem('authTokentrainer');  
    const response = await fetch('http://localhost:3001/api/createWorkout', {
      method: 'GET',
      headers: {
        'X-Api-Key': 'y7/MWMmj+T6P0F0iviT5Tg==9UTCQiAhMg4BoAct',
      },
    });

  if (response.ok) {
    const data = await response.json();
    setWorkoutPlans(data);
  } else {
    console.error('Failed to fetch workout plans');
  }
} catch (error) {
  setError(error.message);
} finally {
  setLoading(false);
  }
};

  useEffect(() => {
  // Fetch workout plans using GET request with authentication
  fetchWorkoutPlans();
}, []);

const handleCreatePlan = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  try {
    // const authTokenUser = localStorage.getItem('authTokenUser');
    setLoading(true);
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing 
    ? `http://localhost:3001/api/createWorkout/${data.id}`
    : 'http://localhost:3001/api/createWorkout/';

    
    const response = await fetch(url, {
      method: method, 
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': 'y7/MWMmj+T6P0F0iviT5Tg==9UTCQiAhMg4BoAct',
      },
      body: JSON.stringify(data),
    });

  if (response.ok) {
    const newWorkout = await response.json();
    setData({ id:newWorkout.id, name: '', type: '', muscle: '', equipment: '', difficulty: '', instructions: '' });
    setSuccessMsg(isEditing ? 'Workout updated successfully' : 'Workout created successfully');
    fetchWorkoutPlans();
    setIsEditing(false);
  } else {
    throw new Error(isEditing ? 'Failed to create or update workout plan' : 'Failed to set goal');
  }
} catch (error) {
  setError(error.message);
} finally {
  setLoading(false);
  }
};

    // Handle form field changes
  const handleChange = (e) => {
  const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  const validateForm = () => {
    const { name, type, muscle, equipment, instructions } = data;
    if (!name || !type || !muscle || !equipment || !instructions) {
      alert('Please fill in all fields.');
      return false; 
    }
    return true;
  };

const handleRemovePlan = async (planId) => {
 try {
    const response = await fetch(`http://localhost:3001/api/createWorkout/${planId}`, {
      method: 'DELETE',
      headers: {
        'X-Api-Key': 'y7/MWMmj+T6P0F0iviT5Tg==9UTCQiAhMg4BoAct',
      },
    });

    if (response.ok) {
      setWorkoutPlans(workoutPlans.filter(plan => plan.id !== planId));
      setSuccessMsg('Workout plan removed successfully');
    } else {
      throw new Error('Failed to remove workout plan');
    }
  } catch (error) {
    setError(error.message);
  }
 };

  //const handleEditPlan = (plan) => {
    //setData(plan);
    //setIsEditing(true);
    //openModal();
  //};

  return (
    <div className="plan-creation-container">
      <h2 className="plan-creation-title">Create Workout Plan</h2>
      {error && <div className="error-message">{error}</div>}
      {successMsg && <div className="success-message">{successMsg}</div>}

      <div className="input-container">
        <button onClick={openModal} className="show-form-button">
          Show Form
        </button>
        {showForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <span className="close-button" onClick={closeModal}>&times;</span>
              <h3>Create Workout Plan</h3>
              <form onSubmit={handleCreatePlan}>
                <div className="plan-label">Plan Name:</div>
                <input type="text" id="name" value={data.name || ''} onChange={handleChange} className="plan-input" />

                <div className="plan-label">Type of Workout:</div>
                <input type="text" id="type" value={data.type || ''} onChange={handleChange} className="plan-input" />

                <div className="plan-label">Muscle:</div>
                <select id="muscle" value={data.muscle || ''} onChange={handleChange} className="plan-input" >
                
                <option value=""> Select a Muscle </option>
                <option value="abdominals">Abdominal</option>
                <option value="abductors">Abductors</option>
                <option value="adductors">Adductors</option>
                <option value="biceps">Biceps</option>
                <option value="calves">Calves</option>
                <option value="chest">Chest</option>
                <option value="forearms">Forearms</option>
                <option value="glutes">Glutes</option>
                <option value="hamstrings">Hamstrings</option>
                <option value="lats">Lats</option>
                <option value="lower_back">Lower Back</option>
                <option value="middle_back">Middle Back</option>
                <option value="neck">Neck</option>
                <option value="quadriceps">Quadriceps</option>
                <option value="traps">Traps</option>
                <option value="triceps">Triceps</option>
                </select>


                <div className="plan-label">Equipment:</div>
                <textarea id="equipment" value={data.equipment || ''} onChange={handleChange} className="plan-textarea" />

                <div className="plan-label">Difficulty:</div>
                <select id="difficulty" value={data.difficulty || ''} onChange={handleChange} className="plan-input" >
                <option value=""> Select Difficulty </option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="expert">Expert</option>
                </select>

                <div className="plan-label">Instructions:</div>
                <textarea id="instructions" value={data.instructions || ''} onChange={handleChange} className="plan-textarea" />

                <div className="modal-button-container">
                  <button type="submit" className="modal-button" disabled={loading}>
                    {loading ? 'Saving...' : isEditing ? 'Update Plan' : 'Create Plan'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Display the list of workout plans in rows */}
      <div className="workout-plan-list">
        <h2 className="workout-plan-list-title">Workout Plans</h2>
        <div className="workout-plan-grid">
          {workoutPlans.length > 0 ? (
          workoutPlans.map((plan) => (
            <WorkoutPlanCard key={plan._id || plan.id || plan.name} 
              plan={plan} 
              handleRemovePlan={handleRemovePlan}/>
          ))) : <p>No workout plans created yet.</p>}
        </div>
      </div>
    </div>
  );
};


const WorkoutPlanCard = ({ plan, handleRemovePlan}) => {
  const planId = plan._id || plan.id;

  return (
    <div className="workout-plan-card">
      <h3>{plan.name}</h3>
      <p>Type: {plan.type}</p>
      <p>Muscle: {plan.muscle}</p>
      <p>Equipment: {plan.equipment}</p>
      <p>Difficulty: {plan.difficulty}</p>
      <Link to={`/workoutPlans/${plan.id}`}>
        <button className="select-plan-button">Select Plan</button>
      </Link>
      <button className='remove-plan-btn'
          onClick={() => handleRemovePlan(planId)}>
        Remove Plan
        </button>
    </div>
  );
};

export default WorkoutPlan;