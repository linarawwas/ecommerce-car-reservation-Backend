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
import { protect } from '../middleware/authMiddleware.js';

router.post('/create', createUser);
router.get('/getAll',  getAllUsers);
router.put('/update/:userId', updateUserById);
router.delete('/delete/:userId', deleteUserById);

router.post('/', registerUser);
router.post('/login', loginUser);


export default router;
