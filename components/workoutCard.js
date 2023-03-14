import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { deleteSingleWorkout } from '../api/workoutData';

function WorkoutCard({ workObj, onUpdate }) {
  const { user } = useAuth();
  const deleteWorkout = () => {
    if (window.confirm(`Delete ${workObj.name}?`)) {
      deleteSingleWorkout(workObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={workObj.image} alt={workObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{workObj.name}</Card.Title>
        <Card.Subtitle>Type: {workObj.type}</Card.Subtitle>
        <Card.Subtitle>Level: {workObj.level}</Card.Subtitle>
        <Card.Text>Sets: {workObj.sets}</Card.Text>
        <Card.Text>Reps: {workObj.reps}</Card.Text>
        {/* DYNAMIC LINK TO VIEW THE Workout DETAILS  */}
        <Link href={`/workout/${workObj.firebaseKey}`} passHref>
          <Button variant="outline-dark" className="m-2">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE Workout DETAILS  */}
        <Link href={`/workout/edit/${workObj.firebaseKey}`} passHref>
          <Button variant="outline-dark" className="m-2">EDIT</Button>
        </Link>
        <>
          {workObj.uid === user.uid ? (
            <Button variant="outline-dark" className="m-2" onClick={deleteWorkout}>
              DELETE
            </Button>
          )
            : ''}
        </>
      </Card.Body>
    </Card>
  );
}

WorkoutCard.propTypes = {
  workObj: PropTypes.shape({
    plan_id: PropTypes.string,
    type: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    level: PropTypes.string,
    sets: PropTypes.string,
    reps: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default WorkoutCard;
