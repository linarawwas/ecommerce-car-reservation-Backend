import express from "express";
import aboutController from "../controllers/aboutController.js";

const router = express.Router();

router.route("/").get(aboutController.getAbout);
router.route("/add").post(aboutController.addAbout);
router.route("/:id").put(aboutController.editAbout);
router.route("/:id").delete(aboutController.removeAbout);

export default router;
