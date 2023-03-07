/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { viewWorkoutDetails } from '../../api/mergedData';

export default function ViewWorkout() {
  const [workDetails, setWorkDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewWorkoutDetails(firebaseKey).then(setWorkDetails);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title> View {workDetails.name} </title>
      </Head>
      <div className="PD-container">
        <div className="PD-photo-container">
          <a href={workDetails.level} target="_tab"><img className="PD-photo" src={workDetails.image} alt={workDetails.name} /></a>
        </div>
        <div className="PD-detail-container">
          <h5 className="PD-pin-name">
            {workDetails.name}
          </h5>
          <hr />
          <p className="PD-desc">{workDetails.sets || ''}
          </p>
          <p className="PD-desc">{workDetails.reps || ''}
          </p>
          <hr />
          <Link href={`/plan/${workDetails.plan_id}`} passHref>
            <Button variant="outline-dark" className="m-2">Return To Plan</Button>
          </Link>
        </div>
      </div>
    </>

  );
}
