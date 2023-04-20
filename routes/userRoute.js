import express from 'express';
import {
  createUser,
  getAllUsers,
  updateUserById,
  deleteUserById,
  registerUser,
  loginUser
} from '../controllers/userController.js';
const router = express.Router();

import { protect,isAdmin } from '../middleware/authMiddleware.js';

router.post('/create', createUser);
router.get('/getAll',protect,isAdmin, getAllUsers);
router.put('/update/:userId',protect,isAdmin, updateUserById);
router.delete('/delete/:userId',protect,isAdmin, deleteUserById);

router.post('/', registerUser);
router.post('/login', loginUser);



export default router;
