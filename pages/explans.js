import React, { useEffect, useState } from 'react';
import { getExPlans } from '../api/explanData';
import ExPlanCard from '../components/ExPlanCard';
import { useAuth } from '../utils/context/authContext';

export default function ExercisePlanPage() {
  const [explans, setExercisePlans] = useState([]);
  const { user } = useAuth();

  const getAllTheExPlans = () => {
    getExPlans(user.uid).then(setExercisePlans);
  };

  useEffect(() => {
    getAllTheExPlans();
  }, []);
  return (
    <>
      <div className="d-flex flex-wrap" id="exercises">
        {explans.map((explan) => (
          <ExPlanCard key={explan.firebaseKey} explanobj={explan} onUpdate={getAllTheExPlans} />
        ))}
      </div>
    </>
  );
}
