import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import Head from 'next/head';
import { useAuth } from '../../utils/context/authContext';
import { getPlans } from '../../api/planData';
import { createWorkout, updateWorkout } from '../../api/workoutData';
// these have to match the name "" in the form input
const initialState = {
  type: '',
  name: '',
  image: '',
  level: '',
  sets: '',
  reps: '',
};

function WorkoutForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [plans, setPlans] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getPlans(user.uid).then(setPlans);
    // conditional for UPDATE/EDIT
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    console.warn('handleChange');
    const { name, value } = e.target;
    console.warn('name, value', name, value);
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateWorkout(formInput)
        .then(() => router.push(`/workout/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createWorkout(payload).then(({ name }) => {
        const patchPayloadFBK = { firebaseKey: name };
        updateWorkout(patchPayloadFBK).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <>
      <Head><title>{obj.firebaseKey ? `Update ${obj.name} Workout` : 'Create Workout'}</title></Head>

      <Form onSubmit={handleSubmit} className="text-color-drkblu">
        <h2 className="mt-5 text-center">{obj.firebaseKey ? 'Update' : 'Create'} Workout</h2>
        <div className="mt-5" />
        {/* name */}
        <div className="">Name</div>
        <FloatingLabel controlId="floatingInput1" label="Workout Name" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter a name..."
            name="name"
            value={formInput.name}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        {/* Type  */}
        <div className="">Type</div>
        <FloatingLabel controlId="floatingInput3" label="Workout Target Area" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter Target Area..."
            name="type"
            value={formInput.type}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        {/* level  */}
        <div className="">Level</div>
        <FloatingLabel controlId="floatingInput4" label="Workout Level" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter easy, medium, or hard"
            name="Enter easy, medium, or hard"
            value={formInput.level}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        {/* Plan SELECT */}
        <div className="">Select Plan</div>
        <FloatingLabel controlId="floatingSelect" label="Plan">
          <Form.Select
            placeholder="Pick a Plan"
            aria-label="Plan"
            name="plan_id"
            onChange={handleChange}
            className="mb-3"
            value={formInput.plan_id}
          >
            <option value="">Select a Plan</option>
            {plans.map((plan) => (
              <option
                key={plan.firebaseKey}
                value={plan.firebaseKey}
              >
                {plan.name}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>

        {/* IMAGE INPUT  */}
        <div className="">Image URL</div>
        <FloatingLabel controlId="floatingInput2" label="Workout Image Url" className="mb-3">
          <Form.Control
            type="url"
            placeholder="Enter an image url"
            name="image"
            value={formInput.image}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        {/* Sets  */}
        <div className="">Sets</div>
        <FloatingLabel controlId="floatingInput5" label="Workout Sets" className="mb-3">
          <Form.Control
            type="number"
            placeholder="Enter Amount Of Sets"
            name="sets"
            value={formInput.sets}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        {/* Reps  */}
        <div className="">Reps</div>
        <FloatingLabel controlId="floatingInput6" label="Workout Reps" className="mb-3">
          <Form.Control
            type="number"
            placeholder="Enter Amount Of Reps"
            name="reps"
            value={formInput.reps}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        {/* SUBMIT BUTTON  */}
        <Button variant="outline-dark" className="m-2 text-color-drkblu" type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Workout</Button>
      </Form>
    </>
  );
}

WorkoutForm.propTypes = {
  obj: PropTypes.shape({
    type: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    level: PropTypes.string,
    sets: PropTypes.string,
    reps: PropTypes.string,
    plan_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

WorkoutForm.defaultProps = {
  obj: initialState,
};

export default WorkoutForm;
