/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getPlans } from '../api/planData';
import PlanCard from '../components/PlanCard';
import UserProfile from '../components/UserProfile';
import { useAuth } from '../utils/context/authContext';

export default function ProfilePage() {
  const [plans, setPlans] = useState([]);
  const { user } = useAuth();

  const getAllThePlans = () => {
    getPlans(user.uid).then(setPlans);
  };

  useEffect(() => {
    getAllThePlans();
  }, []);
  return (
    <>
      <div><UserProfile /></div>
      <div className="d-flex flex-wrap" id="profileworkouts">
        {plans.map((plan) => (
          <PlanCard key={plan.firebaseKey} planObj={plan} onUpdate={getAllThePlans} />
        ))}
      </div>
    </>
  );
}
