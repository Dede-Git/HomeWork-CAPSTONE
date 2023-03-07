import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSinglePlan } from '../../../api/planData';
import PlanForm from '../../../components/forms/PlanForm';

export default function UpdatePlan() {
  const [editPlan, setEditPlan] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    console.warn(firebaseKey);
    // console.warn(getSinglePlan(firebaseKey));
    getSinglePlan(firebaseKey).then(setEditPlan);
  }, [firebaseKey]);

  return (
    <PlanForm obj={editPlan} />
  );
}
