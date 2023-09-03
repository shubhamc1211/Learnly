/**
 * This is the API routes for managing payment details and transactions.
 * Author: Taranjot Singh <tr548284@dal.ca/B00945917>
 */
import express from "express";
import { savePaymentDetails, getPaymentDetails, getBalanceDetails, transferAmount } from "../../controllers/payments/paymentsCont";

const router = express.Router();

// Route to save payment details
router.post("/savePaymentDetails", savePaymentDetails);

// Route to get payment details
router.get("/getPaymentDetails", getPaymentDetails);

// Route to get balance details
router.get("/getBalanceDetails", getBalanceDetails);

// Route to transfer amount
router.post("/transferAmount", transferAmount);

export default router;
