import express from "express";
import { addEmail, getEmails } from "../controllers/newsletterController.js";

import { isAdmin } from '../middleware/authMiddleware.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post("/", addEmail);
router.get("/",authenticateToken,isAdmin, getEmails);

export default router;
