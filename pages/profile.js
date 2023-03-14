/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getPlans } from '../api/planData';
import PlanCard from '../components/PlanCard';
import { signOut } from '../utils/auth';
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
      <div id="profileSection">
        <img src={user.photoURL} alt="userURL" width="200px" height="200px" id="profilepicture" />
        <h2>{user.displayName}</h2>
        <h5>{user.email}</h5>
        <h5>Last Login: {user.metadata.lastSignInTime}</h5>
        <Button type="button" size="lg" cvariant="outline-dark" className="m-2" onClick={signOut}>
          Sign Out
        </Button>
      </div>
      <div className="d-flex flex-wrap" id="profileworkouts">
        {plans.map((plan) => (
          <PlanCard key={plan.firebaseKey} planObj={plan} onUpdate={getAllThePlans} />
        ))}
      </div>
    </>
  );
}
