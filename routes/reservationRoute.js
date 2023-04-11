import express from 'express';
const router = express.Router();
import {getReservationsWithCarAndUserIDs, createReservation, deleteReservation} from '../controllers/reservationController.js';

router.get('/', getReservationsWithCarAndUserIDs); 
router.post('/', createReservation); 
router.delete('/:id', deleteReservation); 

export default router;