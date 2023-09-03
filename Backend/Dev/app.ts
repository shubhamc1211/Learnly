import express, { Express } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import PropertiesReader from "properties-reader";
import { dirPath } from "./util/pathUtil";

const properties = PropertiesReader(
  dirPath.join(__dirname, "../dbconfig/properties.ini")
);

// Import the schemas
import defaultScheduleRoute from "./routes/availability-calendar/defaultScheduleRoute";
import alternateScheduleRoute from "./routes/availability-calendar/alternateScheduleRoute";
import blockDatesRoute from "./routes/availability-calendar/blockDatesRoute";
import calendarSettingsRoute from "./routes/availability-calendar/calendarsettingsRoute";
import switchScheduleRoute from "./routes/availability-calendar/switchScheduleRoute";
import { userRegisterRoute } from "./routes/userAuthentication/userRegistrationRoute";
import getServiceRoute from "./routes/servicesRoutes/getServiceRoute";
import { userLoginRoute } from "./routes/userAuthentication/userLoginRoutes";
import queriesRoutes from "./routes/queriesRoutes";
import studentBookingRoute from "./routes/studentBookingRoute";
import { issueRoute } from "./routes/reportIssues/issueRoute";
import bookingsRoute from "./routes/BookingDashboard/bookingDetails";
import paymentsRoute from "./routes/payments/paymentsRoute";
import putServicesRoute from "./routes/servicesRoutes/putServicesRoute";
import updateServicesRoute from "./routes/servicesRoutes/updateServiceRoute";
import deleteServicesRoute from "./routes/servicesRoutes/deleteServiceRoute";
import mailRoutes from "./routes/mailRoutes/mailRoutes";

const app: Express = express();

//api configuration
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB

mongoose
  .connect(process.env.MONGODB_URI || `${properties.get("dev.MONGODB_URI")}`)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error: Error) => {
    console.log(`${properties.get("dev.MONGODB_URI")}`);

    console.error("Error connecting to MongoDB:", error.message);
  });

//api middlewares
app.use("/api/", defaultScheduleRoute);
app.use("/api/", alternateScheduleRoute);
app.use("/api/", blockDatesRoute);
app.use("/api/", calendarSettingsRoute);
app.use("/api/", switchScheduleRoute);
app.use("/api/", userRegisterRoute);
app.use("/api/", userLoginRoute);
app.use("/api/", queriesRoutes);
app.use(getServiceRoute);
app.use("/api/", userLoginRoute);
app.use(studentBookingRoute);
app.use("/api/", issueRoute);
app.use("/api/", bookingsRoute);
app.use("/api/", paymentsRoute);
app.use("/api/", putServicesRoute);
app.use("/api/", updateServicesRoute);
app.use("/api/", deleteServicesRoute);
app.use("/api/", mailRoutes);

const port: number = 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
