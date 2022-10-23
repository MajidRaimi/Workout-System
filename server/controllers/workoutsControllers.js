const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');
// get all workouts 
const getWorkouts = async (req , res) => {
    const workouts = await Workout.find({}).sort({createdAt : -1}) ; 
    res.status(200).json(workouts);
}


// get a single workout
const getWorkout = async (req , res) => {
    const {id} = req.params ; 

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({msg : 'not valid id'})
    }

    try {
        const workout = await Workout.findById(id) ; 
        
        if (!workout) {
            return res.status(404).json({msg : 'Could find any workout with this id'})
        }
        res.status(200).json(workout);
    } catch (err){
        res.status(404).json({msg : 'Could find any workout with this id'})
    }

}


// create a new workout 
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body;

    try {
        const workout = await Workout.create({
            title, load, reps
        });
        res.status(200).json(workout)
    } catch (e) {
        res.status(400).json({ msg: e.message.toString() });
    }
}

// delete a workout

const deleteWorkout = async (req, res) => {
    const {id} = req.params ; 

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({msg : 'not valid id'})
    }

    const workout = await Workout.findOneAndDelete({_id : id}) ; 

    if (!workout) {
        return res.status(404).json({msg : 'Could find any workout with this id'})
    }

    res.status(200).send(workout) ; 

}


// update a workout

const updateWorkout = async (req, res) => {
    const { id } = req.params ; 

    

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({msg : 'not valid id'})
    }


    const workout = await Workout.findOneAndUpdate(
    {
        _id : id 
    } , 
    {
        ...req.body
    }
    ) ;  

    if (!workout) {
        return res.status(404).json({msg : 'Could find any workout with this id'})
    }

    res.status(200).json(workout) ;

}


module.exports = {
    createWorkout , getWorkouts , getWorkout , deleteWorkout , updateWorkout
}