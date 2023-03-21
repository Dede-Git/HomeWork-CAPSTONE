import { getExercisesByExPlan, getSingleExPlan } from './explanData';
import { getSinglePlan, getWorkoutsByPlan } from './planData';
// import { deleteSingleWorkout } from './workoutData';

const viewPlanDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSinglePlan(firebaseKey).then((plan) => {
    getWorkoutsByPlan(plan.firebaseKey)
      .then((planWorkouts) => {
        resolve({ ...plan, planWorkouts });
      });
  }).catch(reject);
});

const viewExPlanDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleExPlan(firebaseKey).then((plan) => {
    getExercisesByExPlan(plan.firebaseKey)
      .then((planExercises) => {
        resolve({ ...plan, planExercises });
      });
  }).catch(reject);
});

// const deletePlanWorkouts = (planId) => new Promise((resolve, reject) => {
//   getWorkoutsByPlan(planId).then((workoutsArray) => {
//     console.warn(workoutsArray, 'Plan Workouts');
//     const deleteWorkoutPromises = workoutsArray.map((workout) => deleteSingleWorkout(workout.firebaseKey));

//     Promise.all(deleteWorkoutPromises).then(() => {
//       deleteSinglePlan(planId).then(resolve);
//     });
//   }).catch((error) => reject(error));
// });

export { viewPlanDetails, viewExPlanDetails };
