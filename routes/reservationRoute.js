import express from 'express';
import {
    createReservation,
    getAllReservations,
    getReservationById,
    updateReservationById,
    deleteReservationById
} from '../controllers/reservationController.js';

const router = express.Router();

// Create a new reservation
router.post('/', createReservation);

// Get all reservations
router.get('/', getAllReservations);

// Get a reservation by ID
router.get('/:id', getReservationById);

// Update a reservation by ID
router.put('/:id', updateReservationById);

// Delete a reservation by ID
router.delete('/:id', deleteReservationById);

export default router;

