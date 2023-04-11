import Reservation from '../models/reservationModel.js';

// Create a new reservation
const createReservation = async (req, res) => {
    try {
        const { carId, userId } = req.body;
        const reservation = new Reservation({ carId, userId });
        await reservation.save();
        res.status(201).json({ message: 'Reservation created successfully', reservation });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create reservation', errorMessage: error.message });
    }
};

// Get all reservations
const getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.status(200).json({ reservations });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get reservations', errorMessage: error.message });
    }
};

// Get a reservation by ID
const getReservationById = async (req, res) => {
    try {
        const { id } = req.params;
        const reservation = await Reservation.findById(id);
        if (reservation) {
            res.status(200).json({ reservation });
        } else {
            res.status(404).json({ error: 'Reservation not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to get reservation', errorMessage: error.message });
    }
};

// Update a reservation by ID
const updateReservationById = async (req, res) => {
    try {
        const { id } = req.params;
        const { carId, userId } = req.body;
        const updatedReservation = await Reservation.findByIdAndUpdate(id, { carId, userId }, { new: true });
        if (updatedReservation) {
            res.status(200).json({ message: 'Reservation updated successfully', reservation: updatedReservation });
        } else {
            res.status(404).json({ error: 'Reservation not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update reservation', errorMessage: error.message });
    }
};

// Delete a reservation by ID
const deleteReservationById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedReservation = await Reservation.findByIdAndDelete(id);
        if (deletedReservation) {
            res.status(200).json({ message: 'Reservation deleted successfully', reservation: deletedReservation });
        } else {
            res.status(404).json({ error: 'Reservation not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete reservation', errorMessage: error.message });
    }
};

export { createReservation, getAllReservations, getReservationById, updateReservationById, deleteReservationById };

        res.status(200).json(reservationsWithIDs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};