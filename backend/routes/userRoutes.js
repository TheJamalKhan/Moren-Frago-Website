import express from 'express';
import isAuth from '../middleware/isAuth.js';
import { getAdmin, getCurrentUser } from '../controller/userController.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

router.get("/getCurrentUser", isAuth, getCurrentUser);
router.get("/getadmin", adminAuth, getAdmin);

export default router;