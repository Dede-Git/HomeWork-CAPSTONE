/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { getWorkouts } from '../api/workoutData';
import WorkoutCard from '../components/WorkoutCard';
import { useAuth } from '../utils/context/authContext';

function Home() {
  // TODO: Set a state for workouts
  const [workouts, setWorkouts] = useState([]);

  // TODO: Get user ID using useAuth Hook
  const { user } = useAuth();

  // TODO: create a function that makes the API call to get all the workouts
  const getAllTheWorkouts = () => {
    getWorkouts(user.uid).then(setWorkouts);
  };

  // TODO: make the call to the API to get all the workouts on component render
  useEffect(() => {
    getAllTheWorkouts();
  }, []);
  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {/* TODO: map over workouts here using WorkoutCard component */}
        {workouts.map((work) => (
          <WorkoutCard key={work.firebaseKey} workObj={work} onUpdate={getAllTheWorkouts} />
        ))}
      </div>

    </div>
  );
}

export default Home;
