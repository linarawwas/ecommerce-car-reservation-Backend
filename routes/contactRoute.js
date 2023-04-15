import express from 'express';
import {
  createContact,
  getAllContacts,
  updateContactById,
  deleteContactById
} from '../controllers/contactController.js';

const router = express.Router();

router.post('/create', createContact);
router.get('/getAll', getAllContacts);
router.put('/update/:contactId', updateContactById);
router.delete('/delete/:contactId', deleteContactById);

export default router;