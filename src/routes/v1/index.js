const express=require('express');
//const {createChannel}=require('../../utils/messageQueue');
const {BookingController}=require('../../controllers/index');
//const channel=await createChannel();
const bookingController=new BookingController()
const router=express.Router();
router.post('/bookings',bookingController.create);
router.post('/publish',bookingController.sendMessageToQueue);
module.exports=router;