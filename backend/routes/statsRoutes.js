import express from 'express';
import adminAuth from '../middleware/adminAuth.js';
import { getSummary } from '../controller/statsController.js';

const router = express.Router();

// Defines the GET /api/stats/summary route
// This route is protected and only accessible by admins
router.get('/summary', adminAuth, getSummary);

export default router;
