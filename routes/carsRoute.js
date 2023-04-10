import express from "express";
const router = express.Router();
import { getCarById, getCars, createCar, deleteCar,updateCar } from "../controllers/carsController.js";

router.route("/").get(getCars).post( createCar);

router.route("/:id").get(getCarById).delete( deleteCar).put(updateCar);

export default router;