import { useEffect } from 'react';

import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';


const Home = () => {

    const {
        workouts, dispatch
    } = useWorkoutsContext();
    const { user } = useAuthContext();

    useEffect(() => {

        const getWorkouts = async () => {
            const response = await fetch('api/workouts/', {
                headers : {
                    'Authorization' : `Bearer ${user.token}`  
                }
            });
            const data = await response.json();

            if (response.ok) {
                dispatch({ type: 'SET_WORKOUTS', payload: data });
            }
        }

        if (user) {
            getWorkouts();
        }
    }, [dispatch , user])


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

        </div>
    );
}

export default Home;

