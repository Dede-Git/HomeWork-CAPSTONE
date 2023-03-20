import React, { useEffect, useState } from 'react';
import { getExercises } from '../api/exerciseData';
import ExerciseCard from '../components/ExerciseCard';
import { useAuth } from '../utils/context/authContext';

export default function ExercisePage() {
  const [exercises, setExercises] = useState([]);
  const { user } = useAuth();

  const getAllTheExercises = () => {
    getExercises(user.uid).then(setExercises);
  };

  useEffect(() => {
    getAllTheExercises();
  }, []);
  return (
    <>
      <div className="d-flex flex-wrap" id="exercises">
        {exercises.map((exercise) => (
          <ExerciseCard key={exercise.firebaseKey} exerciseobj={exercise} onUpdate={getAllTheExercises} />
        ))}
      </div>
    </>
  );
}
