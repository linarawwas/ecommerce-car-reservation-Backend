import express from 'express';
import {
  createContactAdmin,
  getAllContactsAdmin,
  updateAllContactsAdmin,
  deleteAllContactAdmin
} from '../controllers/contactAdminController.js';

const router = express.Router();
import { isAdmin } from '../middleware/authMiddleware.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

router.post('/create',authenticateToken, createContactAdmin);
router.get('/getAll',authenticateToken,isAdmin, getAllContactsAdmin);
router.put('/update',authenticateToken,isAdmin, updateAllContactsAdmin);
router.delete('/delete',authenticateToken,isAdmin, deleteAllContactAdmin);

export default router;