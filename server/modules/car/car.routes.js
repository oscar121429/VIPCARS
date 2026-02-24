import express from 'express';
import verifyToken from '../../middlewares/verifyToken.js';
import { uploadImages } from '../../middlewares/multiMulter.js';
import carController from './car.controller.js';

const router = express.Router();

router.post('/newCar', verifyToken, uploadImages("cars"), carController.newCar)

export default router;