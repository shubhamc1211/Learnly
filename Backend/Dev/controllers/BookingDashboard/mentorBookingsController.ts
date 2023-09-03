import { Request, Response } from "express";
import StudentBooking from "../../models/StudentBooking";

/**
 * Fetch all bookings for a specific mentor.
 * @param req {Request} - Express request object containing mentor ID.
 * @param res {Response} - Express response object.
 * @returns {Response} Returns bookings or an error message.
 */
export const getMentorBookings = async (req: Request, res: Response) => {
  try {
    let { mentorId } = req.params;
    mentorId = mentorId.split("=")[1];
    if (!mentorId) {
      return res.status(400).send({ message: "Mentor ID is required" });
    }
    const bookings = await StudentBooking.find({ mentorId: mentorId });

    // Transform the selectedDate format for each booking
    bookings.forEach((booking) => {
      if (booking.selectedDate) {
        const date = new Date(booking.selectedDate);
        (booking as any).formattedSelectedDate = date
          .toISOString()
          .split("T")[0];
      }
    });

    return res.status(200).send(bookings);
  } catch (error) {
    console.error("Error fetching mentor bookings:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

/**
 * Cancel a booking by ID.
 * @param req {Request} - Express request object containing booking ID.
 * @param res {Response} - Express response object.
 * @returns {Response} Returns a success message or an error message.
 */
export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.body;
    if (!bookingId) {
      return res.status(400).send({ message: "Booking ID is required" });
    }

    const updatedBooking = await StudentBooking.findOneAndUpdate(
      { bookingId: bookingId },
      { isCancelled: "true" }
    );

    if (!updatedBooking) {
      return res.status(404).send({ message: "Booking not found." });
    }

    return res.status(200).send({
      message: "Booking successfully cancelled.",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error("Error canceling booking:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

/**
 * Reschedule a booking to a new time.
 * @param req {Request} - Express request object containing booking ID and new time.
 * @param res {Response} - Express response object.
 * @returns {Response} Returns the updated booking or an error message.
 */
export const rescheduleBooking = async (req: Request, res: Response) => {
  try {
    const { bookingId, newTime } = req.body;
    if (!bookingId || !newTime) {
      return res
        .status(400)
        .send({ message: "Booking ID and new time are required" });
    }

    // Parse the date and time from the ISO string
    const dateTimeParts = newTime.split("T");
    const selectedDate = dateTimeParts[0];
    const time12Hour = new Date(newTime).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const updatedBooking = await StudentBooking.findOneAndUpdate(
      { bookingId: bookingId },
      {
        selectedTime: time12Hour,
        selectedDate: selectedDate + "T00:00:00.000+00:00",
      },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).send({ message: "Booking not found." });
    }

    return res.status(200).send({
      message: "Booking successfully rescheduled.",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error("Error rescheduling booking:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

export default { getMentorBookings, cancelBooking, rescheduleBooking };
