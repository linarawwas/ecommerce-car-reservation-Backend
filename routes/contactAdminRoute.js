import express from 'express';
import {
  createContactAdmin,
  getAllContactsAdmin,
  updateAllContactsAdmin,
  deleteAllContactAdmin
} from '../controllers/contactAdminController.js';

const router = express.Router();

router.post('/create', createContactAdmin);
router.get('/getAll', getAllContactsAdmin);
router.put('/update', updateAllContactsAdmin);
router.delete('/delete', deleteAllContactAdmin);

export default router;