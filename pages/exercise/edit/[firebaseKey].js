import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleExercise } from '../../../api/exerciseData';
import ExerciseForm from '../../../components/forms/ExerciseForm';

export default function EditExercise() {
  const [editExercise, setEditExercise] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleExercise(firebaseKey).then(setEditExercise);
  }, [firebaseKey]);

  return (<ExerciseForm obj={editExercise} />);
}
