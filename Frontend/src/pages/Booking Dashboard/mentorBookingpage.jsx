/**
 * @author Shivam Lakhanpal <sh475218@dal.ca/B00932887>
 */

import React, { useEffect, useState } from "react";
import { GET_MENTOR_BOOKINGS } from "../../utils/apiUrls";
import BookingDashboardComp from "../../Components/Booking Dashboard/bookingComp";
import PageHeaderComp from "../../Components/Booking Dashboard/header/headerComp";

function MentorBookings() {
  // State to hold fetched bookings
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Function to fetch bookings associated with the mentor
    const fetchBookings = async () => {
      // Retrieve the logged-in user details from local storage
      const localUser = JSON.parse(localStorage.getItem("user"));

      // Extract the mentor's username from the local user details
      const mentorId = localUser && localUser.userName;

      try {
        // Fetch mentor bookings from the server
        const response = await fetch(
          GET_MENTOR_BOOKINGS + "/mentorId=" + mentorId
        );
        const data = await response.json();

        // Update the bookings state with fetched data
        setBookings(data);
      } catch (error) {
        // Log any errors that occur during the fetch
        console.error("Error fetching bookings:", error);
      }
    };

    // Initiate the fetch operation
    fetchBookings();
  }, []); // Empty dependency array means this useEffect will run once when the component mounts

  return (
    <div>
      <PageHeaderComp />
      {/* Map over the bookings and render a BookingDashboardComp for each */}
      {bookings.map((booking) => (
        <BookingDashboardComp key={booking._id} booking={booking} />
      ))}
    </div>
  );
}

export default MentorBookings;
