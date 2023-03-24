# HomeWork

[View The App Here]()

## Get Started

- [React Template Startup Readme](./templateReadMe.md)
- Or You can clone it and start editing here

`$ git clone git@github.com:Dede-Git/HomeWork-CAPSTONE.git`

`$ cd HomeWork`

`$ npm run dev`

## About the user

- The ideal user for Homework is someone who needs a library of workouts that can be done at home
- User has images that show how to properly execute a workout and are allowed to put those workouts in a plan

## Features

- Full CRUD
- Searches Workouts
- Can add workouts into a plan made by user

## Relevant Links

- [Check out the deployed site]()
- [Figma Wireframes](https://www.figma.com/file/6nENsEeOtGzMM5AzuYAhIu/HomeWork?node-id=0-1)
- [ERD](https://dbdiagram.io/d/63f0f79f296d97641d81f899)

- Assumption: Each Workout can fall under only one Plan. Plans can have many Workouts

## Code Snippet

```
  export default function ExercisePage() {
  const [exercises, setExercises] = useState([]);
  const { user } = useAuth();

  const getAllTheExercises = () => {
    getExercises(user.uid).then(setExercises);
  };

  useEffect(() => {
    getAllTheExercises();
  }, []);
  return (
    <>
      <div className="d-flex flex-wrap" id="exercises">
        {exercises.map((exercise) => (
          <ExerciseCard key={exercise.firebaseKey} exerciseobj={exercise} onUpdate={getAllTheExercises} />
        ))}
      </div>
    </>
  );
}

### Tech/framework used
**Built with**
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)

### API Reference
![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)

## Creator

- [DeAndre Hill (Dede)](https://github.com/Dede-Git)
```
