import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// FIXME:  GET ALL Workouts
const getWorkouts = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/workouts.json?orderBy="uid"&equalTo="${uid}"`, {
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

// FIXME: CREATE WORKOUT
const createWorkout = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/workouts.json`, {
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
// FIXME: GET SINGLE WORKOUT
const getSingleWorkout = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/workouts/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }, // you technically do not need the options object for GET requests, but using it here for consistency
  })
    .then((response) => response.json())
    .then((data) => resolve(data)) // will resolve a single object
    .catch(reject);
});

// FIXME: DELETE WORKOUT
const deleteSingleWorkout = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/workouts/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
// FIXME: UPDATE WORKOUT
const updateWorkout = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/workouts/${payload.firebaseKey}.json`, {
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

const getEasyWorkouts = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/workouts.json?orderBy="level"&equalTo="easy"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const easywork = Object.values(data).filter((item) => item.easy);
      resolve(easywork);
    })
    .catch(reject);
});

export {
  getWorkouts,
  getSingleWorkout,
  deleteSingleWorkout,
  updateWorkout,
  createWorkout,
  getEasyWorkouts,
};
