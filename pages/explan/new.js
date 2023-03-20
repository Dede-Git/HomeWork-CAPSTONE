import Head from 'next/head';
import React from 'react';
import ExPlanForm from '../../components/forms/ExPlanForm';

export default function CreatePlan() {
  return (
    <>
      <Head>
        <title>Add New Exercise Plan</title>
      </Head>
      <ExPlanForm />
    </>
  );
}
