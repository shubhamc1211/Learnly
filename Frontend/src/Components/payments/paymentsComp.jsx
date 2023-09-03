/**
 * This component manages the Payments section of the application.
 * It allows users to connect their payment account, view their balance, and transfer funds.
 * The component includes a dialog for connecting the payment account and transferring funds.
 *
 * Author: Taranjot Singh <tr548284@dal.ca/B00945917>
 */

import "./paymentsComp.css";
import React, { useState } from "react";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { grey } from "@mui/material/colors";
import { SAVE_PAYMENT_DETAILS, GET_PAYMENT_DETAILS, GET_BALANCE_DETAILS, TRANSFER_AMOUNT } from "../../utils/apiUrls";
import axios from 'axios';
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import UseMediaQuery from "@mui/material/useMediaQuery";

// Theme for responsive breakpoints
const theme = createTheme({
    breakpoints: {
        values: {
            xs: 330,
            sm: 380,
            md: 430,
            lg: 1100,
            xl: 1450,
        },
    },
});

// Styled ConnectButton using MUI's styled function
const ConnectButton = styled(Button)(({ theme }) => ({
    height: "100%",
    width: "70%",
    fontWeight: 600,
    pointerEvents: "auto",
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: "#1D267D",
    "&:hover": {
        backgroundColor: "#0C134F",
    },
}));

// Styled CheckoutButton using MUI's styled function
const CheckoutButton = styled(Button)(({ theme }) => ({
    height: "100%",
    width: "70%",
    fontWeight: 600,
    pointerEvents: "auto",
    marginLeft: "20px",
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: "#1D267D",
    "&:hover": {
        backgroundColor: "#0C134F",
    },
}));

export default function Payments() {
    // State variables
    const [openDialog, setOpenDialog] = useState(false);
    const [page, setPage] = useState(1);
    const [totalBalance, setTotalBalance] = useState(0);
    const [accountNumber, setAccountNumber] = useState("");
    const [transitNumber, setTransitNumber] = useState("");
    const [institutionNumber, setInstitutionNumber] = useState("");
    const [email, setEmail] = useState("");
    const [transferAmount, setTransferAmount] = useState("");
    const [transferDialogOpen, setTransferDialogOpen] = useState(false);
    const [localUser, setLocalUser] = useState(null);
    const [accountConnected, setAccountConnected] = useState(false);

    // Media query for different screen sizes
    const isExtraSmallScreen = UseMediaQuery((theme) =>
        theme.breakpoints.down("xs")
    );
    const isSmallScreen = UseMediaQuery((theme) => theme.breakpoints.down("sm"));
    const isMediumScreen = UseMediaQuery((theme) => theme.breakpoints.down("md"));

    // Function for opening dialog box
    const handleDialogOpen = () => {
        setPage(1);
        setOpenDialog(true);
    };

    // Function for closing dialog box
    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    // Function for opening transfer dialog box
    const handleTransferDialogOpen = () => {
        setTransferDialogOpen(true);
    };

    // Function for closing transfer dialog box
    const handleTransferDialogClose = () => {
        setTransferDialogOpen(false);
        setTransferAmount("");
    };

    // Function for handling amount transfer
    const handleTransfer = async () => {
        if (transferAmount === "") {
            toast.error("Please provide the transfer amount.");
        }
        else if (transferAmount < 0) {
            toast.error("The amount can't be negative!");
        }
        else if (accountNumber === "" || email === "") {
            toast.error("Please connect your payment account and provide your email before transferring.");
        }
        else if (transferAmount > totalBalance) {
            toast.error("You have entered an amount that is more than the Total Balance.");
        } else {
            const amountTransferData = {
                mentorId: localUser.userName,
                transferAmount,
                email,
                accountNumber,
            }
            console.log(amountTransferData);
            const apiUrl = TRANSFER_AMOUNT;
            try {
                const response = await axios.post(apiUrl, amountTransferData);
                if (response.status === 200) {
                    console.log("Successfully transfered $ " + transferAmount + " amount to your bank account.");
                    toast.success("Successfully transfered $ " + transferAmount + " amount to your bank account.");
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                } else {
                    console.log("Fail to transfer amount");
                    toast.error("Fail to transfer amount");
                }
                handleTransferDialogClose();
            }
            catch (error) {
                console.log(error);
                console.log('Fail to transfer amount');
            }
        }
    };

    // Function for handling the second page
    const handleNextPage = () => {
        if (
            accountNumber.length === 7 &&
            transitNumber.length === 5 &&
            institutionNumber.length === 3
        ) {
            setPage(2);
        } else {
            console.log("Please fill in all required fields.");
            toast.error("Account number, transit number, and institution number must be integers of the specified length.");
        }
    };

    // Function for connecting the account
    const handleConnect = async () => {
        if (page === 1) {
            handleNextPage();
        } else if (page === 2) {
            if (email.length === 0) {
                toast.error("Please provide an email address.");
            } else if (!/\S+@\S+\.\S+/.test(email)) {
                toast.error("Please provide a valid email address.");
            }
            else {
                const paymentDetailsData = {
                    mentorId: localUser.userName,
                    accountNumber,
                    transitNumber,
                    institutionNumber,
                    email,
                }
                console.log(paymentDetailsData);
                const apiUrl = SAVE_PAYMENT_DETAILS;
                try {
                    const response = await axios.post(apiUrl, paymentDetailsData);
                    if (response.status === 200) {
                        console.log("Payment Details Saved Successfully!");
                        toast.success("Payment Details Saved Successfully!");
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                    } else {
                        console.log("Failed to Save Payment Details");
                    }
                    setOpenDialog(false);
                }
                catch (error) {
                    console.log(error);
                    console.log('Failed to Save Calendar Settings');
                }
            }
        }
    };

    useEffect(() => {
        // Fetch local user from local storage
        const localUser = JSON.parse(localStorage.getItem("user"));
        console.log("Printing local user:", localUser);
        setLocalUser(localUser);

        // Fetch total balance
        const fetchTotalBalance = async () => {
            try {
                const apiUrl = GET_BALANCE_DETAILS;
                const params = {
                    mentorId: localUser.userName,
                };
                const response = await axios.get(apiUrl, { params });
                const fetchedBalanceDetails = response?.data?.balanceDetails;
                console.log(fetchedBalanceDetails);
                if (fetchedBalanceDetails) {
                    console.log(fetchedBalanceDetails);
                    setTotalBalance(Number(fetchedBalanceDetails.totalBalance));
                }
            }
            catch (error) {
                console.error(error);
            }
        };

         // Fetch payment details
        const fetchPaymentDetails = async () => {
            try {
                const apiUrl = GET_PAYMENT_DETAILS;
                const params = {
                    mentorId: localUser.userName,
                };
                const response = await axios.get(apiUrl, { params });
                const fetchedPaymentDetails = response?.data?.paymentDetails;
                if (fetchedPaymentDetails) {
                    console.log(fetchedPaymentDetails);
                    setAccountNumber(String(fetchedPaymentDetails.accountNumber));
                    setTransitNumber(String(fetchedPaymentDetails.transitNumber));
                    setInstitutionNumber(String(fetchedPaymentDetails.institutionNumber));
                    setEmail(fetchedPaymentDetails.email);
                    setAccountConnected(true);
                }
            } catch (error) {
                console.error(error);
            }
        };
        // Call the fetch functions
        fetchTotalBalance();
        fetchPaymentDetails();
    }, []);

    // rendering
    return (
        <>
            <br />
            <div className="payment-header">
                <h1 className="payments-form-header">PAYMENTS
                    <hr />
                </h1>
            </div>
            <br />
            <div className="Payments">
                <div className="payments-container">
                    <div className="left-pay">
                        <div className="balance" style={{ marginLeft: isMediumScreen ? "25px" : "0" }}>
                            <div className="icon-and-text">
                                <VisibilityIcon style={{ fontSize: "40px" }} />
                                <p style={{ fontSize: "18px" }}>Balance</p>
                            </div>
                            <div className="balance-amount" style={ isMediumScreen ? {marginTop: "-140px", marginLeft: "70px"}  : { marginTop: "-30px", marginLeft: "-10px" }}>
                                <br /><br />
                                <strong style={{ fontSize: "30px", textAlign: "center" }}>$ {totalBalance}</strong>
                                {totalBalance !== 0 && (
                                    <ThemeProvider theme={theme}>
                                        <CheckoutButton
                                            variant="contained"
                                            fullWidth
                                            style={{ marginTop: "20px" }}
                                            onClick={handleTransferDialogOpen}
                                        >
                                            Checkout
                                        </CheckoutButton>
                                    </ThemeProvider>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="right-pay" style={{ marginLeft: isMediumScreen ? "25px" : "70px" }}>
                        <div className="checkout">
                            <ConnectButton
                                variant="contained"
                                fullWidth
                                onClick={handleDialogOpen}
                                style={{
                                    width: isMediumScreen ? "90%" : "70%",
                                    fontSize: isExtraSmallScreen ? "12px" : "",
                                }}
                            >
                                {accountConnected ? "Update Payment Account" : "Connect Payment Account"}
                            </ConnectButton>
                        </div>
                    </div>
                </div>
            </div>
            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>
                    {page === 1 ? "Connect Payment Account" : "Provide Email"}
                    <Button onClick={handleDialogClose} color="primary" style={{ position: 'absolute', top: 13, right: 0 }}>
                        X
                    </Button>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {page === 1
                            ? "Please provide your Canadian bank account details."
                            : "Please provide your email address."}
                    </DialogContentText>
                    <br></br>
                    {page === 1 && (
                        <>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Account Number (7 digits)"
                                type="number"
                                fullWidth
                                required
                                value={accountNumber}
                                onChange={(e) => setAccountNumber(e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                label="Transit Number (5 digits)"
                                type="number"
                                fullWidth
                                required
                                value={transitNumber}
                                onChange={(e) => setTransitNumber(e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                label="Institution Number (3 digits)"
                                type="number"
                                fullWidth
                                required
                                value={institutionNumber}
                                onChange={(e) => setInstitutionNumber(e.target.value)}
                            />
                        </>
                    )}
                    {page === 2 && (
                        <TextField
                            margin="dense"
                            label="Email"
                            type="email"
                            fullWidth
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    {page === 1 && (
                        <Button onClick={handleDialogClose} color="primary">
                            Cancel
                        </Button>
                    )}
                    <Button onClick={handleConnect} color="primary">
                        {page === 1 ? "Next" : "Connect"}
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={transferDialogOpen} onClose={handleTransferDialogClose}>
                <DialogTitle>Transfer Amount</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Amount to Transfer"
                        type="number"
                        fullWidth
                        required
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleTransferDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleTransfer} color="primary">
                        Transfer
                    </Button>
                </DialogActions>
            </Dialog>

            <ToastContainer position="top-center" />
        </>
    );
}
