import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const ReservationSchema = new Schema(
    {

        car_id: {
            type: String,
            required: true
        },
        user_id: {
            type: String,
            required: true
        }},
    {
        collection: 'reservations',
        timestamps: true,
    }

);

const Reservation = model('Reservation', ReservationSchema);
export default Reservation;