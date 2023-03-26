/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { viewPlanDetails } from '../../api/mergedData';
import { useAuth } from '../../utils/context/authContext';
import WorkoutCard from '../../components/workoutCard';

export default function ViewPlan() {
  const [planDetails, setPlanDetails] = useState({});
  const router = useRouter();
  const { user } = useAuth();
  const { firebaseKey } = router.query;

  const getAllWorkoutsByPlan = () => {
    viewPlanDetails(firebaseKey).then(setPlanDetails);
  };

  useEffect(() => {
    getAllWorkoutsByPlan();
  }, [firebaseKey]);

  return (
    <div className="BD-container">
      <div className="BD-detail-cont-bg" style={{ backgroundImage: `url(${planDetails.image})` }}>
        <div className="BD-detail-cont">
          {/* <div className="BD-photo-cont"><img className="BD-photo" src={planDetails.image} alt={planDetails.name} /></div> */}
          <div className="BD-name-cont"><h2 className="BD-name">{planDetails.name}</h2></div>
          <div className="BD-desc-cont"><h5 className="BD-description">{planDetails.description}</h5></div>
          <div className="BD-edit-cont">
            <Link href={`edit/${planDetails.firebaseKey}`} passHref>
              {planDetails.uid === user.uid ? (<Button variant="dark" className="m-2">Edit {planDetails.name} </Button>) : '' }
            </Link>
          </div>
        </div>
      </div>
      <div className="d-flex flex-wrap">
        {planDetails.planWorkouts?.map((workout) => (
          <WorkoutCard key={workout.firebaseKey} workObj={workout} onUpdate={getAllWorkoutsByPlan} />
        ))}
      </div>
    </div>
  );
}
