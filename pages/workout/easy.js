import React, { useEffect, useState } from 'react';
import { getEasyWorkouts } from '../../api/workoutData';
import WorkoutCard from '../../components/WorkoutCard';

export default function EasyWorkouts() {
  const [easyWorkouts, setEasyWorkouts] = useState([]);

  const getAllEasyWorkouts = () => {
    getEasyWorkouts().then(setEasyWorkouts);
  };

  useEffect(() => {
    getAllEasyWorkouts();
  }, []);
  return (
    <div className="easy-card-container, d-flex flex-wrap">
      {easyWorkouts.map((easywork) => (
        <WorkoutCard key={easywork.firebaseKey} workObj={easywork} onUpdate={getAllEasyWorkouts} />
      ))}
    </div>
  );
}
