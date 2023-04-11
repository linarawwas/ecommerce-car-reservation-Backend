import express from 'express';
const router = express.Router();
import controller from '../controllers/reservationController.js';

router.get('/', controller.getReservationsWithCarAndUserIDs); 
router.post('/', controller.createReservation); 
router.delete('/:id', controller.deleteReservation); 

export default router;