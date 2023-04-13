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
        userId: {  // Reference to the User model using the custom userId field
            type: Number, // Update to match the field type in your User model
            ref: User,
            required: true,
            // Update this path to the appropriate field name in the User model
            path: 'userId' 
        }
    },
    {
        collection: 'reservations',
        timestamps: true,
    }
);

const Reservation = model('Reservation', ReservationSchema);
export default Reservation;
