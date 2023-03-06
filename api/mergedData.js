import { deleteSinglePlan, getWorkoutsByPlan } from './planData';
import { deleteSingleWorkout } from './workoutData';

const deletePlanWorkouts = (planId) => new Promise((resolve, reject) => {
  getWorkoutsByPlan(planId).then((workoutsArray) => {
    console.warn(workoutsArray, 'Plan Workouts');
    const deleteWorkoutPromises = workoutsArray.map((workout) => deleteSingleWorkout(workout.firebaseKey));

    Promise.all(deleteWorkoutPromises).then(() => {
      deleteSinglePlan(planId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export default deletePlanWorkouts;
