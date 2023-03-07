import Head from 'next/head';
import React from 'react';
import PlanForm from '../../components/forms/PlanForm';

export default function CreatePlan() {
  return (
    <>
      <Head>
        <title>Add New Plan</title>
      </Head>
      <PlanForm />
    </>
  );
}
