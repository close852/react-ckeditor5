import express from 'express';
import app from './app'
import upload from './upload'

const router = express.Router();


router.use('/app', app);/*requireRole("USER"), */
router.use('/upload', upload);/*requireRole("USER"), */
export default router;