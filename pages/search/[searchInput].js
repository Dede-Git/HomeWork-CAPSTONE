/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getWorkouts } from '../../api/workoutData';
import WorkoutCard from '../../components/WorkoutCard';
import { useAuth } from '../../utils/context/authContext';

export default function SearchResult() {
  const [searchResults, setSearchResults] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  const { searchInput } = router.query;

  const getSearchResults = () => {
    getWorkouts(user.uid).then((searchResultsArray) => {
      const filterResults = searchResultsArray.filter((workouts) => workouts.name.toLowerCase().includes(searchInput)
      || workouts.type.toLowerCase().includes(searchInput)
      || workouts.level.toLowerCase().includes(searchInput));
      setSearchResults(filterResults);
    });
  };

  useEffect(() => {
    getSearchResults();
    return () => {
      setSearchResults([]);
    };
  }, [searchInput]);
  return (
    <div>
      <div className="d-flex flex-wrap">
        {searchResults.map((obj) => (
          <WorkoutCard key={obj.firebaseKey} workObj={obj} onUpdate={getSearchResults} />
        ))}
      </div>
    </div>
  );
}
