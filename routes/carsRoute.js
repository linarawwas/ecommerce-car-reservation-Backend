import express from "express";
const router = express.Router();
import { getCarById, getCars, createCar, deleteCar } from "../controllers/carsController.js";

router.route("/").get(getCars).post( createCar);

router.route("/:id").get(getCarById).delete( deleteCar);

export default router;