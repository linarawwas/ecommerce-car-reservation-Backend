import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const ReservationSchema = new Schema(
    {
        car: {  // Reference to the Car model
            type: Schema.Types.ObjectId,
            ref: 'Car',
            required: true
        },
        user: {  // Reference to the User model
            type: Schema.Types.ObjectId,
            ref: 'User',
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
