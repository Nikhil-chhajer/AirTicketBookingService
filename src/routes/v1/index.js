const express=require('express');
//const {createChannel}=require('../../utils/messageQueue');
const {BookingController}=require('../../controllers/index');
//const channel=await createChannel();
const bookingController=new BookingController()
const router=express.Router();
router.get('/info',(req,res)=>{
    return res.json({
        message:"respone from routes"
    })
})
router.post('/bookings',bookingController.create);
router.post('/publish',bookingController.sendMessageToQueue);
module.exports=router;