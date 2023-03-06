import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// FIXME:  GET ALL PLANS - by user
const getPlans = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/plans.json?orderBy="uid"&equalTo="${uid}"`, {
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

// FIXME: CREATE PLAN
const createPlan = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/plans.json`, {
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
// FIXME: GET SINGLE PLAN
const getSinglePlan = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/plans/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }, // you technically do not need the options object for GET requests, but using it here for consistency
  })
    .then((response) => response.json())
    .then((data) => resolve(data)) // will resolve a single object
    .catch(reject);
});

// FIXME: DELETE PLAN
const deleteSinglePlan = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/plans/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
// FIXME: UPDATE PLAN
const updatePlan = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/plans/${payload.firebaseKey}.json`, {
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

const getWorkoutsByPlan = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/workouts.json?orderBy="plan_id"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }, // you technically do not need the options object for GET requests, but using it here for consistency
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  getPlans,
  getSinglePlan,
  createPlan,
  updatePlan,
  deleteSinglePlan,
  getWorkoutsByPlan,
};
