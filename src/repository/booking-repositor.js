const { StatusCodes } = require('http-status-codes');
const { AppError, ValidationError } = require('../utils/errors/index');
class BookingRepository {
    async create(data) {
        try {
            const booking = await BookingRepository.create(data);
            return booking;
        } catch (error) {
            if (error.name == 'SequelizeValidationError') {
                throw new ValidationError(error);
            }
            throw new AppError(
                'RepositoryError',
                'Cannot create Booking',
                'There was some issue creating the booking,please try again later',
                StatusCodes.INTERNAL_SERVER_ERROR
            );

        }
    }
}
module.exports = BookingRepository;