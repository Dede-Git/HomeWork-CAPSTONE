import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useAuth } from '../../utils/context/authContext';
import { updatePlan, createPlan } from '../../api/planData';

const initialState = {
  name: '',
  description: '',
  image: '',
};

export default function PlanForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updatePlan(formInput)
        .then(() => router.push('/profile'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createPlan(payload).then(({ name }) => {
        const patchPayloadFBK = { firebaseKey: name };
        updatePlan(patchPayloadFBK).then(() => {
          router.push('/profile');
        });
      });
    }
  };

  return (
    <div className="plan-form-container">
      <Head><title>{obj.firebaseKey ? `Update ${obj.name} Plan` : 'Create Plan'}</title></Head>

      <Form onSubmit={handleSubmit} className="text-color-drkblu">
        <h2 className="mt-5 text-center">{obj.firebaseKey ? `Update ${obj.name}` : 'Create Plan'}</h2>
        <div className="mt-5" />
        <div className=""> Plan Name</div>
        <FloatingLabel
          controlId="floatingInput1"
          label="Plan Name"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Plan Name"
            name="name"
            value={formInput.name}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <div className="">Description</div>
        <FloatingLabel
          controlId="floatingInput2"
          label="Plan Description"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Description"
            style={{ height: '100px' }}
            name="description"
            value={formInput.description}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <div className="">Plan Cover Image URL</div>
        <FloatingLabel
          controlId="floatingInput3"
          label="Image URL"
          className="mb-3"
        >
          <Form.Control
            type="url"
            placeholder="Cover Image URL"
            name="image"
            value={formInput.image}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <Button type="submit" variant="outline-dark" className="m-2 text-color-drkblu">{obj.firebaseKey ? 'Update' : 'Create'}</Button>
      </Form>
    </div>
  );
}

PlanForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    uid: PropTypes.string,
    description: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

PlanForm.defaultProps = {
  obj: initialState,
};
