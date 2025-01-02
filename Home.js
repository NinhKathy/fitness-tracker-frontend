import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
    const [workoutPlans, setWorkoutPlans] = useState([]);
    const navigate = useNavigate();
      
    async function fetchWorkoutPlans() {
        try {
          const response = await fetch(`http://localhost:3001/api/workouts`, {
            method: 'GET',
            headers: {
            //   Authorization: authTokenTrainer
              "X-Api-Key": 'y7/MWMmj+T6P0F0iviT5Tg==9UTCQiAhMg4BoAct',
            },
          });
    
          if (response.ok) {
            const data = await response.json();
            setWorkoutPlans(data);
          } else {
            console.error('Failed to fetch workout plans');
          }
        } catch (error) {
          console.error('An error occurred while fetching workout plans:', error);
        }
      }
    
      useEffect(() => {
        // Fetch workout plans using GET request with authentication
        fetchWorkoutPlans();
      }, []);
    
      return (
        <div className="plan-creation-container">
          {/* Display the list of workout plans in rows */}
          <div className="workout-plan-list">
            <h2 className="workout-plan-list-title">Browse Workout Plans</h2>
            <div className="workout-plan-grid">
              {workoutPlans.map((plan) => (
                <WorkoutPlanCard key={plan.id} plan={plan} navigate={navigate} />
              ))}
            </div>
          </div>
        </div>
      );
}

const WorkoutPlanCard = ({ plan, navigate }) => {
  const handleSelectPlan = () => {
    navigate(`/apiWorkoutPlans/${plan.id}`);
  }; 

    return (
      <div className="workout-plan-card">
        <h3>{plan.name}</h3>
        <p>Type: {plan.type}</p>
        <p>Muscle: {plan.muscle}</p>
        <p>Equipment: {plan.equipment}</p>
        <p>Difficulty: {plan.difficulty}</p>
        <Link to={`/apiWorkoutPlans/${plan.id}`}>
          <button className="select-plan-button" onClick={handleSelectPlan}>Select Plan</button>
        </Link>
      </div>
    );
  };

export default Home