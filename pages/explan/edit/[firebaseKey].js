import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleExPlan } from '../../../api/explanData';
import ExPlanForm from '../../../components/forms/ExPlanForm';

export default function UpdateExPlan() {
  const [editExPlan, setEditExPlan] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    console.warn(firebaseKey);
    // console.warn(getSinglePlan(firebaseKey));
    getSingleExPlan(firebaseKey).then(setEditExPlan);
  }, [firebaseKey]);

  return (
    <ExPlanForm obj={editExPlan} />
  );
}
