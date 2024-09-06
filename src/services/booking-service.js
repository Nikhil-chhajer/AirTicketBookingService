const {BookingRepository}=require('../repository/index');
const axios=require('axios');
const {FLIGHT_SERVICE_PATH}=require('../config/serverConfig');
const { ServiceError } = require('../utils/errors');
class BookingService{
    constructor(){
        this.bookingRepository=new BookingRepository();
    }
    async createBooking(data){
     try {
        const flightId=data.flightId;
        let getFlightRequestURL=`${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
        const response=await axios.get(getFlightRequestURL);
        const flightdata=response.data.data;

        const priceOfTheFlight=flightdata.price;
       if(data.noOfSeat>flightdata.totalSeats){
        throw new ServiceError('something went wrong in booking process',
        'Insufficient seats in flight');
       }
        const TotalCost=data.noOfSeat*priceOfTheFlight;
        const bookingpayload={...data,TotalCost};
        console.log(bookingpayload);
        const booking=await this.bookingRepository.create(bookingpayload);
        const updateFlightRequestURL=`${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
        await axios.patch(updateFlightRequestURL,{totalSeats:flightdata.totalSeats-booking.noOfSeat});
        const finalbooking=await this.bookingRepository.update(booking.id,{status:"Booked"});
        return finalbooking;
        

     } catch (error) {
        if(error.name=='repositoryError'|| error.name=='ValidationError'){
            throw error;
        }
        throw new ServiceError();
     }


    }
}

module.exports=BookingService;