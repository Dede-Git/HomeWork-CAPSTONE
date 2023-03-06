import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import deletePlanWorkouts from '../api/mergedData';
import { useAuth } from '../utils/context/authContext';

export default function PlanCard({ planObj, onUpdate }) {
  const { user } = useAuth();
  const deleteSinglePlan = () => {
    if (window.confirm(`Delete ${planObj.name}?`)) {
      deletePlanWorkouts(planObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <div>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Img variant="top" src={planObj.image} alt={planObj.name} style={{ height: '400px' }} />
        <Card.Body>
          <Card.Title>{planObj.name}</Card.Title>
          <Card.Body>{planObj.description}</Card.Body>
        </Card.Body>
        <Link href={`/plan/${planObj.firebaseKey}`} passHref>
          <Button variant="outline-dark" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/plan/edit/${planObj.firebaseKey}`} passHref>
          {planObj.uid === user.uid ? (<Button variant="outline-dark" className="m-2">EDIT</Button>) : '' }
        </Link>
        <>
          {planObj.uid === user.uid ? (
            <Button variant="outline-dark" className="m-2" onClick={deleteSinglePlan}>
              DELETE
            </Button>
          )
            : ''}
        </>
      </Card>
    </div>
  );
}

PlanCard.propTypes = {
  planObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
