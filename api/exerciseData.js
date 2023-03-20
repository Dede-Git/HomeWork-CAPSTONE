import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// FIXME:  GET ALL EXERCISES
const getExercises = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/exercises.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// FIXME: CREATE EXERCISE
const createExercise = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/exercises.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
// FIXME: GET SINGLE EXERCISE
const getSingleExercise = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/exercises/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }, // you technically do not need the options object for GET requests, but using it here for consistency
  })
    .then((response) => response.json())
    .then((data) => resolve(data)) // will resolve a single object
    .catch(reject);
});

// FIXME: DELETE EXERCISE
const deleteSingleExercise = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/exercises/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
// FIXME: UPDATE EXERCISE
const updateExercise = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/exercises/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getExercises,
  getSingleExercise,
  deleteSingleExercise,
  updateExercise,
  createExercise,
};
