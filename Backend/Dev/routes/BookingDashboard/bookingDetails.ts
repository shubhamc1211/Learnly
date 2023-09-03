import express from "express";
import mentorBookingsController from "../../controllers/BookingDashboard/mentorBookingsController";

const router = express.Router();

/**
 * @route GET /getMentorBookings/:mentorId
 * @group Bookings - Operations related to bookings.
 * @param {string} mentorId.path.required - The ID of the mentor whose bookings are to be fetched.
 * @returns {Array.<Object>} 200 - An array of bookings for the specified mentor.
 * @returns {Error} 400 - Mentor ID is required.
 * @returns {Error} 500 - Internal Server Error.
 */
router.get(
  "/getMentorBookings/:mentorId",
  mentorBookingsController.getMentorBookings
);

/**
 * @route POST /cancelBooking
 * @group Bookings - Operations related to bookings.
 * @param {string} bookingId.body.required - The ID of the booking to be cancelled.
 * @returns {Object} 200 - Information about the cancelled booking.
 * @returns {Error} 400 - Booking ID is required.
 * @returns {Error} 404 - Booking not found.
 * @returns {Error} 500 - Internal Server Error.
 */
router.post("/cancelBooking", mentorBookingsController.cancelBooking);

/**
 * @route POST /rescheduleBooking
 * @group Bookings - Operations related to bookings.
 * @param {string} bookingId.body.required - The ID of the booking to be rescheduled.
 * @param {string} newTime.body.required - The new time for the booking.
 * @returns {Object} 200 - Information about the rescheduled booking.
 * @returns {Error} 400 - Booking ID and new time are required.
 * @returns {Error} 404 - Booking not found.
 * @returns {Error} 500 - Internal Server Error.
 */
router.post("/rescheduleBooking", mentorBookingsController.rescheduleBooking);

const bookingsRoute = router;
export default bookingsRoute;
