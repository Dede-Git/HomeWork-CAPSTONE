import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { deleteSingleExercise } from '../api/exerciseData';

function ExerciseCard({ exerciseobj, onUpdate }) {
  const { user } = useAuth();
  const deleteExercise = () => {
    if (window.confirm(`Delete ${exerciseobj.name}?`)) {
      deleteSingleExercise(exerciseobj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }} id="exercisecard">
      <Card.Img variant="top" src={exerciseobj.image} alt={exerciseobj.name} style={{ height: '200px' }} />
      <Card.Body>
        <Card.Title>{exerciseobj.name}</Card.Title>
        <Card.Subtitle>Seconds: {exerciseobj.seconds}</Card.Subtitle>
        {/* DYNAMIC LINK TO VIEW THE Workout DETAILS  */}
        <Link href={`/exercise/${exerciseobj.firebaseKey}`} passHref>
          <Button variant="outline-dark" className="m-2">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE Workout DETAILS  */}
        <Link href={`/exercise/edit/${exerciseobj.firebaseKey}`} passHref>
          <Button variant="outline-dark" className="m-2">EDIT</Button>
        </Link>
        <>
          {exerciseobj.uid === user.uid ? (
            <Button variant="outline-dark" className="m-2" onClick={deleteExercise}>
              DELETE
            </Button>
          )
            : ''}
        </>
      </Card.Body>
    </Card>
  );
}

ExerciseCard.propTypes = {
  exerciseobj: PropTypes.shape({
    explan_id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    seconds: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ExerciseCard;
