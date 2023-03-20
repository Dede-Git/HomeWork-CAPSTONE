/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
// import { viewWorkoutDetails } from '../../api/mergedData';
import { getSingleExercise } from '../../api/exerciseData';

export default function ViewExercise() {
  const [exerciseDetails, setExerciseDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleExercise(firebaseKey).then(setExerciseDetails);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title> View {exerciseDetails.name} </title>
      </Head>
      <div className="PD-container">
        <div className="PD-photo-container">
          <a href={exerciseDetails.level} target="_tab"><img className="PD-photo" src={exerciseDetails.image} alt={exerciseDetails.name} style={{ height: '400px', width: '600px' }} /></a>
        </div>
        <div className="PD-detail-container">
          <h5 className="PD-pin-name">
            {exerciseDetails.name}
          </h5>
          <hr />
          <p className="PD-desc">Seconds: {exerciseDetails.seconds || ''}
          </p>
          <hr />
          <Link passHref href="/exercises">
            <Button variant="outline-dark" className="m-2">Return To Exercises</Button>
          </Link>
        </div>
      </div>
    </>

  );
}
