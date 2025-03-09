import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, Box, RadioGroup, FormControlLabel, Radio } from "@mui/material";

const PaymentForm = () => {
  const [amount, setAmount] = useState("5");
  const [currency, setCurrency] = useState("EUR");
  const [paymentMethod, setPaymentMethod] = useState("s2s");
  const [cardDetails, setCardDetails] = useState({ card_number: "", expires: "", cvc: "", cardholder_name: "" });

  const handlePayment = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/payments/charge`, { amount, currency, paymentMethod, cardDetails });
      alert("Payment processed successfully!");
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4, p: 3, border: "1px solid #ccc", borderRadius: 2 }}>
        <Typography variant="h4" align="center">Payment Form</Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField fullWidth label="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <TextField fullWidth label="Currency" value={currency} onChange={(e) => setCurrency(e.target.value)} />
        </Box>
        <RadioGroup row value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <FormControlLabel value="payform" control={<Radio />} label="Payform" />
          <FormControlLabel value="s2s" control={<Radio />} label="S2S" />
        </RadioGroup>
        <TextField fullWidth label="Card Number" value={cardDetails.card_number} onChange={(e) => setCardDetails({ ...cardDetails, card_number: e.target.value })} />
        <TextField fullWidth label="Cardholder Name" value={cardDetails.cardholder_name} onChange={(e) => setCardDetails({ ...cardDetails, cardholder_name: e.target.value })} />
        <TextField fullWidth label="Expiration Date" placeholder="MM/YY" value={cardDetails.expires} onChange={(e) => setCardDetails({ ...cardDetails, expires: e.target.value })} />
        <TextField fullWidth label="Security Code" value={cardDetails.cvc} onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })} />
        <Button fullWidth variant="contained" color="primary" onClick={handlePayment}>Pay</Button>
      </Box>
    </Container>
  );
};

export default PaymentForm;