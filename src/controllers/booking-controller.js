const {StatusCodes}=require('http-status-codes');
const {BookingService}=require('../services/index');
const bookingService=new BookingService();
const {createChannel,publishMessage}=require('../utils/messageQueue');
const {REMAINDER_BINDING_KEY}=require('../config/serverConfig');
class BookingController{
    constructor(){
        
    }

async sendMessageToQueue(req,res){
    const channel=await createChannel();
    const payload={
        data:{
            subject:'This is notification from queue',
            content :'Some queue will subscribe this',
            recepientEmail:'nikhil.chhajer80@gmail.com',
            notificationTime:'2023-12-26T09:49:00'
        },
        service:'CREATE_TICKET'
    }
    
    publishMessage(channel,REMAINDER_BINDING_KEY,JSON.stringify(payload));
    return res.status(200).json({
        message:'Successfully published the event'
    });


}

    async create (req,res){
        try {
            const response=await bookingService.createBooking(req.body);
            return res.status(StatusCodes.OK).json({
                message:'successfully completed booking',
                success:true,
                err:{},
                data:response
            })
    
    
        } catch (error) {
            return res.status(error.statusCodes).json({
                message:error.message,
                success:false,
                err:error.explaination,
                data:{}
            })
            
        }
    }
}

module.exports=BookingController