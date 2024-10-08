const {StatusCode}=require('http-status-codes');
class ValidationError extends Error{
    constructor(error){
        super();
        let explaination=[];
        error.errors.forEach((err)=> {
          explaination.push(err.message);
        });
        this.name='validationError';
        this.message='Not able to validate the data sent in the request';
        this.explaination=explaination;
        this.statusCode=StatusCode.BAD_REQUEST
    }
}
module.exports=ValidationError;