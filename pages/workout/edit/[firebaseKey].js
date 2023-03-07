import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleWorkout } from '../../../api/workoutData';
import WorkoutForm from '../../../components/forms/WorkoutForm';

export default function EditWorkout() {
  const [editWork, setEditWork] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleWorkout(firebaseKey).then(setEditWork);
  }, [firebaseKey]);

  return (<WorkoutForm obj={editWork} />);
}
