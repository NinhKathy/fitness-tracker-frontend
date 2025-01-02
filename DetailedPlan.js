import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom'; // Hook for accessing route parameters
import '../styles/DetailedPlan.css';

const DetailedPlan = () => {
  const { planId } = useParams(); // Extract planId from the URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const planName = queryParams.get('plan');

  const [planDetails, setPlanDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlanDetails = async () => {
      if (!planId) {
        setError('Plan ID is missing');
        return;
      }

      try {
        const response = await fetch(`http://localhost:3001/api/createWorkout/${planId}`, {
          method: 'GET',
          headers: {
            'X-Api-Key': 'y7/MWMmj+T6P0F0iviT5Tg==9UTCQiAhMg4BoAct',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setPlanDetails(data);
        } else {
          throw new Error('Failed to fetch workout plan details');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanDetails();
  }, [planId]); // Refetch data if planId changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!planDetails) return <div>No details available for this plan.</div>;

  return (
    <div className="detailed-plan-container">
      <h2>{planDetails.name}</h2>
      <p><strong>Type:</strong> {planDetails.type}</p>
      <p><strong>Muscle Group:</strong> {planDetails.muscle}</p>
      <p><strong>Equipment:</strong> {planDetails.equipment}</p>
      <p><strong>Difficulty:</strong> {planDetails.difficulty}</p>
      <p><strong>Instructions:</strong> {planDetails.instructions}</p>
      {planName && <p><strong>Plan Name from Query Param:</strong> {planName}</p>}
      <Link to="/workout-plan">
        <button>Back to Plans</button>
      </Link>

    </div>
  );
};

export default DetailedPlan;