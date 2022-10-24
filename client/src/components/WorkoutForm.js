import { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const WorkoutForm = () => {

    const {
        dispatch
    } = useWorkoutsContext();

    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const workout = {
            title, load, reps
        }

        const response = await fetch(
            '/api/workouts/',
            {
                method: 'POST',
                body: JSON.stringify(workout),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        const json = await response.json();

        if (!response.ok) {
            setError(json.msg);

        }
        if (response.ok) {

            dispatch(
                {
                    type : 'CREATE_WORKOUT', payload : json
                }
            )


            setTitle('');
            setLoad('');
            setReps('');

            setError(null);
            console.log('New Workout Added');
        }

    }

    return (
        <form action="" onSubmit={handleSubmit} className="create">
            <h3>Add a new workout</h3>
            <label>Exercise Title : </label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            <label>Load in ( kg ) : </label>
            <input
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
            />
            <label>Reps : </label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
            />
            <button>Add workout</button>
            {error && <div className="error">{error}</div>}

        </form>

    )
}

export default WorkoutForm; 