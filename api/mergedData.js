import { deleteSinglePlan, getSinglePlan, getWorkoutsByPlan } from './planData';
import { deleteSingleWorkout, getSingleWorkout } from './workoutData';

const viewPlanDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSinglePlan(firebaseKey).then(([plan]) => {
    getWorkoutsByPlan(plan.firebaseKey)
      .then((planWorkouts) => resolve({ ...plan, planWorkouts }));
  }).catch(reject);
});

const viewWorkoutDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleWorkout(firebaseKey).then((work) => {
    getSinglePlan(work.plan_id)
      .then((workData) => resolve({ ...work, workData }));
  }).catch(reject);
});

const deletePlanWorkouts = (planId) => new Promise((resolve, reject) => {
  getWorkoutsByPlan(planId).then((workoutsArray) => {
    console.warn(workoutsArray, 'Plan Workouts');
    const deleteWorkoutPromises = workoutsArray.map((workout) => deleteSingleWorkout(workout.firebaseKey));

    Promise.all(deleteWorkoutPromises).then(() => {
      deleteSinglePlan(planId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export { deletePlanWorkouts, viewPlanDetails, viewWorkoutDetails };
