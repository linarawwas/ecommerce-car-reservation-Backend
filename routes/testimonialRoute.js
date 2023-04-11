import express from "express";

import testimonialController from "../controllers/testimonialsController.js";

const router = express.Router();

router.route("/").get(testimonialController.getAll);
router.route("/add").post(testimonialController.addTestimonial);
router.route("/:id").get(testimonialController.getOne);
router.route("/:id").delete(testimonialController.deleteTestimonial);
router.route("/:id").put(testimonialController.editTestimonial);

export default router;
