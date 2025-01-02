import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import UserNavigation from './NavigationBar';
import Home from "./routes/Home"
import WorkoutDetails from './routes/WorkoutDetails';
import UserLogin from "./routes/Login";
import UserRegister from './routes/UserRegister';
import TrainerRegister from './routes/TrainerRegister';
import SetGoal from "./routes/Goal";
import DetailedPlan from "./routes/DetailedPlan";
import WorkoutPlan from "./routes/WorkoutPlan";
import NutritionPlanCreation from './routes/NutritionPlan';
import ProgressTracking from "./routes/ProgressTracking";


/** Restaurant Finder Application */

function App() {
  return (
    <div className="App"> 
      <BrowserRouter>
        <UserNavigation />
       
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/apiWorkoutPlans/:id" element={<WorkoutDetails />} />
          <Route path="/workoutPlans/:planId" element={<DetailedPlan />} />
          <Route path="/goal" element={<SetGoal/>} />
          <Route path="/workout-plan" element={<WorkoutPlan/>} />
          <Route path="/nutritionplancreation/:id" element={<NutritionPlanCreation />} />
          <Route path="/progress-tracking" element={<ProgressTracking/>} />
          <Route path="/user-register" element={<UserRegister />} />
          <Route path="/trainerProfile" element={<TrainerRegister />} />
          <Route path="/user-login" element={<UserLogin />} />
        </Routes>
        
      </BrowserRouter>
    </div>
  )
}

export default App;