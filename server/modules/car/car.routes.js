import express from 'express';
import verifyToken from '../../middlewares/verifyToken.js';
import { uploadImages } from '../../middlewares/multiMulter.js';
import carController from './car.controller.js';

const router = express.Router();

router.post('/newCar', verifyToken, uploadImages("cars"), carController.newCar);
router.get('/getImages/:car_id', verifyToken, carController.getImages);
router.post('/addPictures/:car_id', verifyToken, uploadImages("cars"), carController.addPictures);
router.post('/delImage', verifyToken, carController.delImage);
router.put('/delLogicCar/:car_id', verifyToken, carController.delLogicCar);
router.put('/updateCar/:car_id', verifyToken, carController.updateCar);
router.get('/carById/:car_id', verifyToken, carController.carById);

export default router;