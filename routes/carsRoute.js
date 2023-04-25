import express from "express";
const router = express.Router();
import { getCarById, getCars, createCar, deleteCar,updateCar } from "../controllers/carsController.js";
import { isAdmin } from '../middleware/authMiddleware.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

router.route("/").get(getCars).post(authenticateToken,isAdmin, createCar);

router.route("/:id").get(getCarById).delete( authenticateToken,isAdmin,deleteCar).put(authenticateToken,isAdmin,updateCar);

export default router;