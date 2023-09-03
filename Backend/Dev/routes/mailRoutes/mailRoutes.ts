/**
 * @author Shubham Chauhan <sh572302@dal.ca/B00945891>
 */
import express from "express";

import mailCont from "../../controllers/mailCont/mailCont";

const router = express.Router();

// POST /api/fetch/fetchCity
router.post("/userUpdates", mailCont.sendMail);


const mailRoutes = router
export default  mailRoutes;