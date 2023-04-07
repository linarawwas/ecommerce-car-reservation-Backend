import  express  from "express";
import contactController from "../controllers/contactController.js";

const router = express.Router();


router.route('/').get(contactController.getAll)
router.route('/').post(contactController.createContact);
router.route('/:id').get(contactController.getContactById);
router.route('/:id').delete(contactController.deleteContact);



export default router;