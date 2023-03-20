import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// FIXME:  GET ALL EXPLANS - by user
const getExPlans = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/explans.json?orderBy="uid"&equalTo="${uid}"`, {
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

// FIXME: CREATE EXPLAN
const createExPlan = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/explans.json`, {
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
// FIXME: GET SINGLE EXPLAN
const getSingleExPlan = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/explans/${firebaseKey}.json`, {
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
const deleteSingleExPlan = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/explans/${firebaseKey}.json`, {
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
const updateExPlan = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/explans/${payload.firebaseKey}.json`, {
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

const getExercisesByExPlan = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/exercises.json?orderBy="explan_id"&equalTo="${firebaseKey}"`, {
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
  getExPlans,
  getSingleExPlan,
  createExPlan,
  updateExPlan,
  deleteSingleExPlan,
  getExercisesByExPlan,
};
