const {StatusCodes}=require('http-status-codes');
class ServiceError extends Error{
    constructor(
        messsage,
        explaination,
        statusCodes=StatusCodes.INTERNAL_SERVER_ERROR
        ){
           super(); 
         this.name='ServiceError';
         this.message=messsage;
         this.explaination=explaination;
         this.statusCodes=statusCodes;
    }
}
module.exports=ServiceError;