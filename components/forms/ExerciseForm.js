import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import Head from 'next/head';
import { useAuth } from '../../utils/context/authContext';
import { getExPlans } from '../../api/explanData';
import { createExercise, updateExercise } from '../../api/exerciseData';
// these have to match the name "" in the form input
const initialState = {
  name: '',
  image: '',
  seconds: '',
};

function ExerciseForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [explans, setExPlans] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getExPlans(user.uid).then(setExPlans);
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
      updateExercise(formInput)
        .then(() => router.push(`/exercise/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createExercise(payload).then(({ name }) => {
        const patchPayloadFBK = { firebaseKey: name };
        updateExercise(patchPayloadFBK).then(() => {
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
        <FloatingLabel controlId="floatingInput1" label="Exercise Name" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Exercise name..."
            name="name"
            value={formInput.name}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        {/* Type  */}
        <div className="">Seconds</div>
        <FloatingLabel controlId="floatingInput3" label="Seconds" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter Seconds..."
            name="seconds"
            value={formInput.seconds}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        {/* Plan SELECT */}
        <div className="">Select Exercise Plan</div>
        <FloatingLabel controlId="floatingSelect" label="Exercise Plan">
          <Form.Select
            placeholder="Pick a Exercise Plan"
            aria-label="Exercise Plan"
            name="explan_id"
            onChange={handleChange}
            className="mb-3"
            value={formInput.explan_id}
          >
            <option value="">No Plan</option>
            {explans.map((explan) => (
              <option
                key={explan.firebaseKey}
                value={explan.firebaseKey}
              >
                {explan.name}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>

        {/* IMAGE INPUT  */}
        <div className="">Image URL</div>
        <FloatingLabel controlId="floatingInput2" label="Exercise Image Url" className="mb-3">
          <Form.Control
            type="url"
            placeholder="Enter an image url"
            name="image"
            value={formInput.image}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        {/* SUBMIT BUTTON  */}
        <Button variant="outline-dark" className="m-2 text-color-drkblu" type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Exercise</Button>
      </Form>
    </>
  );
}

ExerciseForm.propTypes = {
  obj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    seconds: PropTypes.string,
    explan_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

ExerciseForm.defaultProps = {
  obj: initialState,
};

export default ExerciseForm;
