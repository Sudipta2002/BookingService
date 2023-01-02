const { Booking, sequelize } = require('../models/index');
const { AppError, ValidationError } = require('../utils/errors/index');
// const ValidationError = require('../utils/errors/index');
const { StatusCodes } = require('http-status-codes');
class BookingRepository {
    async create(data) {
        try {
            const booking = await Booking.create(data);
            return booking;
        } catch (error) {
            if (error.name == "SequelizeValidationError") {
                throw new ValidationError(error);
            }
            throw new AppError('Repository Error',
                'Cannot create Booking',
                'There was some issue while creating booking ,please try again later',
                StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async update(bookingId, data) {
        try {
            const booking = await Booking.findByPk(bookingId);
            if (data.status) {
                booking.status = data.status;
            }
            await booking.save();
            return booking;
        } catch (error) {
            throw new AppError('Repository Error',
                'Cannot update Booking',
                'There was some issue while creating booking ,please try again later',
                StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

}

module.exports = BookingRepository;