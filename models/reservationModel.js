import mongoose from 'mongoose';
import User from './userModel.js';
import Car from './carsModel.js';
const { Schema, model } = mongoose;

const ReservationSchema = new Schema(
    {
        carId: {  // Reference to the Car model
            type: Schema.Types.ObjectId,
            ref: Car,
            required: true
        },
        userId: {  // Reference to the User model
            type: Schema.Types.ObjectId,
            ref: User,
            required: true
        }
    },
    {
        collection: 'reservations',
        timestamps: true,
    }
);

const Reservation = model('Reservation', ReservationSchema);
export default Reservation;
