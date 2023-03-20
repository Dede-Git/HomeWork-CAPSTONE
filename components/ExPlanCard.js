import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
// import { deletePlanWorkouts } from '../api/mergedData';
import { useAuth } from '../utils/context/authContext';
import { deleteSingleExPlan } from '../api/explanData';

export default function ExPlanCard({ explanobj, onUpdate }) {
  const { user } = useAuth();
  const deleteExPlan = () => {
    if (window.confirm(`Delete ${explanobj.name}?`)) {
      deleteSingleExPlan(explanobj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <div>
      <Card style={{ width: '18rem', margin: '10px' }} id="explancard">
        <Card.Img variant="top" src={explanobj.image} alt={explanobj.name} style={{ height: '400px' }} />
        <Card.Body>
          <Card.Title>{explanobj.name}</Card.Title>
          <Card.Body>{explanobj.description}</Card.Body>
        </Card.Body>
        <Link href={`/explan/${explanobj.firebaseKey}`} passHref>
          <Button variant="outline-dark" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/explan/edit/${explanobj.firebaseKey}`} passHref>
          {explanobj.uid === user.uid ? (<Button variant="outline-dark" className="m-2">EDIT</Button>) : '' }
        </Link>
        <>
          {explanobj.uid === user.uid ? (
            <Button variant="outline-dark" className="m-2" onClick={deleteExPlan}>
              DELETE
            </Button>
          )
            : ''}
        </>
      </Card>
    </div>
  );
}

ExPlanCard.propTypes = {
  explanobj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
