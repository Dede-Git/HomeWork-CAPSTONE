import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useAuth } from '../../utils/context/authContext';
import { createExPlan, updateExPlan } from '../../api/explanData';

const initialStateBF = {
  name: '',
  description: '',
  image: '',
};

export default function ExPlanForm({ obj }) {
  const [formInput, setFormInput] = useState(initialStateBF);
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
      updateExPlan(formInput)
        .then(() => router.push('/explans'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createExPlan(payload).then(({ name }) => {
        const patchPayloadFBK = { firebaseKey: name };
        updateExPlan(patchPayloadFBK).then(() => {
          router.push('/explans');
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
        <div className=""> Stretch Plan Name</div>
        <FloatingLabel
          controlId="floatingInput1"
          label="Exercise Plan Name"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Exercise Plan Name"
            name="name"
            value={formInput.name}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <div className="">Description</div>
        <FloatingLabel
          controlId="floatingInput2"
          label="description"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Exercise Plan Description"
            style={{ height: '100px' }}
            name="description"
            value={formInput.description}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <div className="">Stretch Plan Cover Image URL</div>
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

ExPlanForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    uid: PropTypes.string,
    description: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

ExPlanForm.defaultProps = {
  obj: initialStateBF,
};
