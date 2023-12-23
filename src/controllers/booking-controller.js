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
    const data={message:'Success'};
    publishMessage(channel,REMAINDER_BINDING_KEY,JSON.stringify(data));
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