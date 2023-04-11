import express from 'express';
import {
  createUser,
  getAllUsers,
  updateUserById,
  deleteUserById
} from '../controllers/userController.js';

const router = express.Router();

router.post('/create', createUser);
router.get('/getAll', getAllUsers);
router.put('/update/:userId', updateUserById);
router.delete('/delete/:userId', deleteUserById);

export default router;