import { useEffect } from 'react';

import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';



const Home = () => {

    const {
        workouts, dispatch
    } = useWorkoutsContext();


    useEffect(() => {

        const getWorkouts = async () => {
            const response = await fetch('api/workouts/');
            const data = await response.json();

            if (response.ok) {
                dispatch({ type: 'SET_WORKOUTS', payload: data });
            }
        }
        getWorkouts();
    }, [dispatch])


    return (
        <div className="">
            <div className="home">
                <div className="workouts">
                    {
                        workouts && workouts.map(workout => (
                            <WorkoutDetails key={workout._id} workout={workout} />
                        )
                        )
                    }
                </div>
                <WorkoutForm />
            </div>
            <video autoPlay loop muted src="https://prakhar826.github.io/anime-video/VID_20220916_090448_554.mp4" alt="" />

        </div>
    );
}

export default Home;

