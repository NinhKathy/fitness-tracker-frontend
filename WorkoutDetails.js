import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';  
import '../styles/WorkoutDetails.css'; 

function WorkoutDetails() {
    const { id } = useParams();  // Get the workout plan id from the URL
    const [workout, setWorkout] = useState(null);

    useEffect(() => {
        // Fetch the workout details when the component mounts
        async function fetchWorkoutDetail() {
            try {
                const response = await fetch(`http://localhost:3001/api/workouts/${id}`, {
                    method: 'GET',
                    headers: {
                        "X-Api-Key": 'y7/MWMmj+T6P0F0iviT5Tg==9UTCQiAhMg4BoAct',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setWorkout(data);
                } else {
                    console.error('Failed to fetch workout details');
                }
            } catch (error) {
                console.error('An error occurred while fetching workout details:', error);
            }
        }

        fetchWorkoutDetail();
    }, [id]);

    if (!workout) {
        return <div>Loading workout details...</div>;
    }

    return (
        <div className="workout-details-container">
            <h2>{workout.name}</h2>
            <p><strong>Type:</strong> {workout.type}</p>
            <p><strong>Muscle Targeted:</strong> {workout.muscle}</p>
            <p><strong>Equipment Required:</strong> {workout.equipment}</p>
            <p><strong>Difficulty:</strong> {workout.difficulty}</p>
            <h3>Instructions</h3>
            <p>{workout.instructions}</p>
            <Link to="/">
                <button>Back to Home</button>
            </Link>
        </div>
    );
}

export default WorkoutDetails;