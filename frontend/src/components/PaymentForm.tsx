import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, Box, RadioGroup, FormControlLabel, Radio } from "@mui/material";

const PaymentForm = () => {
  const [amount, setAmount] = useState("5");
  const [currency, setCurrency] = useState("EUR");
  const [paymentMethod, setPaymentMethod] = useState("s2s");
  const [email, setEmail] = useState("test@gmail.com");
  const [cardDetails, setCardDetails] = useState({ card_number: "4444333322221111", expires: "17/27", cvc: "", cardholder_name: "John Doe" });

  const handlePayment = async () => {
    try {
      const body = {
        client: { email },
        purchase: {
          products: [{ name: "test", price: Number(amount) }],
        },
        brand_id: process.env.REACT_APP_BRAND_ID || "77ede2ab-d039-4894-8913-6acf29551825",
      };

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/purchases/create`, body);

      if (response.status === 201) {
        let { direct_post_url, success_redirect, failure_redirect } = response.data;

        if (direct_post_url) {
          const form = document.createElement("form");
          form.method = "POST";
          form.action = `${direct_post_url}?s2s=true`;

          const inputs = [
            { name: "card_number", value: cardDetails.card_number },
            { name: "expires", value: cardDetails.expires },
            { name: "cvc", value: cardDetails.cvc },
            { name: "cardholder_name", value: cardDetails.cardholder_name },
          ];

          inputs.forEach(({ name, value }) => {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = name;
            input.value = value;
            form.appendChild(input);
          });

          document.body.appendChild(form);
          form.submit();

          if (success_redirect) {
            window.location.href = success_redirect;
          } else {
            alert("Success of making Purchase, but no success_redirect provided.");
          }
        } else {
          // Если direct_post_url не пришел, отправляем запрос на /purchases/direct_post_url
          console.log("direct_post_url is missing. Trying /purchases/direct_post_url...");
          const directPostResponse = await axios.post(
            `${process.env.REACT_APP_API_URL}/purchases/direct_post_url?s2s=true`,
            {
              cardholder_name: cardDetails.cardholder_name,
              card_number: cardDetails.card_number,
              expires: cardDetails.expires,
              cvc: cardDetails.cvc,
              remember_card: "on",
              remote_ip: "8.8.8.8",
              user_agent: navigator.userAgent,
              accept_header: "text/html",
              language: "en-US",
              java_enabled: false,
              javascript_enabled: true,
              color_depth: 24,
              utc_offset: new Date().getTimezoneOffset(),
              screen_width: window.screen.width,
              screen_height: window.screen.height,
            }
          );

          console.log("response /purchases/direct_post_url", directPostResponse);

          const { status } = directPostResponse.data;

          if (status === "authorized" && success_redirect) {
            window.location.href = success_redirect;
          } else {
            alert(`🚀 Payment Status: ${status} 🚀\n⚠️ You haven't been redirected because there was no success_redirect`);
          }
        }
      } else {
        if (response.data.failure_redirect) {
          window.location.href = response.data.failure_redirect;
        } else {
          alert("Failed to retrieve direct_post_url and there is no failure_redirect");
        }
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("An error occurred while processing payment.");
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
        <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
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
