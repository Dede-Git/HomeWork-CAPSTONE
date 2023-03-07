/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { viewPlanDetails } from '../../api/mergedData';
import { useAuth } from '../../utils/context/authContext';
import ViewYourWorkouts from '../../components/ViewYourWorkouts';

export default function ViewPlan() {
  const [planDetails, setPlanDetails] = useState({});
  const router = useRouter();
  const { user } = useAuth();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewPlanDetails(firebaseKey).then(setPlanDetails);
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
      <div className="BD-pin-container">
        <ViewYourWorkouts />
      </div>
    </div>
  );
}
