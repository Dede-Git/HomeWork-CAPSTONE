import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { viewPlanDetails } from '../api/mergedData';
import { getWorkoutsByPlan } from '../api/planData';
import { useAuth } from '../utils/context/authContext';
import WorkoutCard from './WorkoutCard';

export default function ViewYourWorkouts() {
  const [planDetails, setPlanDetails] = useState({});
  const router = useRouter();
  const { user } = useAuth();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewPlanDetails(firebaseKey).then(setPlanDetails);
  }, [firebaseKey]);

  const getAllWorkoutsByPlan = () => {
    getWorkoutsByPlan(firebaseKey);
  };

  return (
    <div className="d-flex flex-wrap">
      {planDetails.planWorkouts?.map(() => (
        <WorkoutCard key={user.firebaseKey} workObj={user} onUpdate={getAllWorkoutsByPlan} />
      ))}
    </div>
  );
}
