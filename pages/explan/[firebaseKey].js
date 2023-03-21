/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { viewExPlanDetails } from '../../api/mergedData';
import { useAuth } from '../../utils/context/authContext';
import ExerciseCard from '../../components/ExerciseCard';

export default function ViewExPlan() {
  const [explanDetails, setExPlanDetails] = useState({});
  const router = useRouter();
  const { user } = useAuth();
  const { firebaseKey } = router.query;

  const getAllExercisesByExPlan = () => {
    viewExPlanDetails(firebaseKey).then(setExPlanDetails);
  };

  useEffect(() => {
    getAllExercisesByExPlan();
  }, [firebaseKey]);

  return (
    <div className="BD-container">
      <div className="BD-detail-cont-bg" style={{ backgroundImage: `url(${explanDetails.image})` }}>
        <div className="BD-detail-cont">
          {/* <div className="BD-photo-cont"><img className="BD-photo" src={planDetails.image} alt={planDetails.name} /></div> */}
          <div className="BD-name-cont"><h2 className="BD-name">{explanDetails.name}</h2></div>
          <div className="BD-desc-cont"><h5 className="BD-description">{explanDetails.description}</h5></div>
          <div className="BD-edit-cont">
            <Link href={`edit/${explanDetails.firebaseKey}`} passHref>
              {explanDetails.uid === user.uid ? (<Button variant="dark" className="m-2">Edit {explanDetails.name} </Button>) : '' }
            </Link>
          </div>
        </div>
      </div>
      <div className="d-flex flex-wrap">
        {explanDetails.explanExercises?.map((exercise) => (
          <ExerciseCard key={exercise.firebaseKey} exerciseobj={exercise} onUpdate={getAllExercisesByExPlan} />
        ))}
      </div>
    </div>
  );
}
