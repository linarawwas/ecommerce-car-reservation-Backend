import Reservation from '../models/reservationModel.js'; 
import Car from '../models/carsModel.js';
import User from '../models/userModel.js'; 

// Controller function to delete a reservation
export const deleteReservation = async (req, res) => {
    const { reservationId } = req.params; // Extract reservation ID from request parameters

    try {
        // Find the reservation by ID and remove it from the database
        const reservation = await Reservation.findByIdAndRemove(reservationId);

        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        res.status(200).json({ message: 'Reservation deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Controller function to create a new reservation
export const createReservation = async (req, res) => {
    const { userId, carId } = req.body; // Extract user ID and car ID from request body

    try {
        // Check if the car and user exist in the database
        const car = await Car.findById(carId);
        const user = await User.findById(userId);

        if (!car || !user) {
            return res.status(404).json({ error: 'Car or user not found' });
        }

        // Create a new reservation with the extracted user ID and car ID
        const newReservation = new Reservation({ car: carId, user: userId });
        const reservation = await newReservation.save();

        res.status(201).json({ message: 'Reservation created successfully', reservation });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Controller function to retrieve reservations with car and user IDs
export const getReservationsWithCarAndUserIDs = async (req, res) => {
    try {
        // Retrieve reservations with populated car and user fields
        const reservations = await Reservation.find({})
            .populate('car', 'id') // Only retrieve the 'id' field from the Car model
            .populate('user', 'id'); // Only retrieve the 'id' field from the User model

        // Extract the reservation ID, car ID, and user ID from the populated fields
        const reservationsWithIDs = reservations.map(reservation => ({
            reservationId: reservation._id,
            carId: reservation.car.id,
            userId: reservation.user.id
        }));

        res.status(200).json(reservationsWithIDs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};