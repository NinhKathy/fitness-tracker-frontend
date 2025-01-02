
import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css'

function UserNavigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/goal">Fitness Goal</Link>
        </li>
        <li>
          <Link to="/workout-plan">Workout Plan</Link>
        </li>
        <li>
          <Link to="/progress-tracking">Progress Tracking</Link>
        </li>
        <li>
          <Link to="/user-login">Login</Link>
        </li>
        
        
        {/* Add other user-specific links */}
      </ul>
    </nav>
  );
}

export default UserNavigation;
