require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');


const app = express()


const PORT = process.env.PORT;

{/* Middleware */ }

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})


{/* Routes */ }

app.use('/api/workouts', workoutRoutes);

{/* Connecting To Database */}
 
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected To Database');
        app.listen(PORT, () => {
            console.log(`Listening On Port ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error.toString());
    })


