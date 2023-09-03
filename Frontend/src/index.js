import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import LoginPage from "./pages/login/loginPage";
import RegisterPage from "./pages/register/registerPage";
import RegisterAboutYouPage from "./pages/register/registerAboutYou/registerAboutYouPage";
import App from "./app";
import StudentBookingApp from "./studentBookingApp";
import LandingPage from "./pages/landing/landingPage";
import ContactPage from "./pages/contact/contactPage";
import AvailabilityCalendarPage from "./pages/availability-calendar/availabilityCalendarPage";

import PaymentsPage from "./pages/payments/paymentsPage";
import QueriesPage from "./pages/queries/queriesPage";
import MentorServiceHomePage from "./pages/MentorServiceBooking/HomePage/MentorServiceHomePage";
import BookingSchedulePage from "./pages/MentorServiceBooking/bookingSchedule/bookingSchedulePage";
import StudentDetailsPage from "./pages/MentorServiceBooking/studentDetails/studentDetailsPage";
import PaymentDetailsPage from "./pages/payments/paymentDetailsPage";
import ProfileManagementPage from "./pages/profileMangement/profileMangementPage";
import ReportPage from "./pages/report-issue/reportPage";
import IssueForm from "./pages/report-issue/issueForm";
import IssueDetails from "./pages/report-issue/issueDetails";
import MentorBookings from "./pages/Booking Dashboard/mentorBookingpage";

import MentorServicesPage from "./pages/mentorServices/mentorServicesPage";

const localUser = JSON.parse(localStorage.getItem("user"));

const isAuthenticated = localUser !== null;

// const Navigator = useNavigate();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<App />}>
        <Route exact path="/" element={<LandingPage />} />

        <Route path="/contact" element={<ContactPage />} />

        {console.log("Printing from index:", isAuthenticated, localUser)}

        {isAuthenticated && (
          <Route path="/register" element={<Navigate to="/" />} />
        )}

        {isAuthenticated && (
          <Route path="/login" element={<Navigate to="/" />} />
        )}

        {/* If logged in redirect to gomepage */}

        <Route path="/register" element={<RegisterPage />} />

        <Route exact path="/login" element={<LoginPage />} />

        {!isAuthenticated && (
          <Route path="*" element={<Navigate to="/login" />} />
        )}

        {/* Anything that needs login must come blow this */}

        <Route path="/about-you" element={<RegisterAboutYouPage />} />
        <Route path="/calendar" element={<AvailabilityCalendarPage />} />

        <Route path="/payments" element={<PaymentsPage />} />
        <Route path="/profile-settings" element={<ProfileManagementPage />} />
        <Route path="/issues" element={<ReportPage />} />
        <Route path="/issue/new" element={<IssueForm />} />
        <Route path="/issue/:id" element={<IssueDetails />} />
        <Route path="/queries" element={<QueriesPage />} />
        <Route path="/bookings" element={<MentorBookings />} />

        <Route path="/services" element={<MentorServicesPage />} />
      </Route>

      <Route exact path="/" element={<StudentBookingApp />}>
        <Route path="/bookingSchedule" element={<BookingSchedulePage />} />

        <Route path="/paymentDetails" element={<PaymentDetailsPage />} />

        <Route path="/studentDetails" element={<StudentDetailsPage />} />

        <Route
          path="/mentorServiceBooking/:id"
          element={<MentorServiceHomePage />}
        />
      </Route>
    </Routes>
  </BrowserRouter>
);
