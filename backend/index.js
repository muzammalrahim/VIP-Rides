const express = require("express");
const app = express();
const { resolve } = require("path");

// This is your real test secret API key.
const stripe = require("stripe")(`sk_test_McEyUwSrL9RyuFWCTaxv4dmd`);
app.use(express.static("."));
app.use(express.json());
const calculateOrderAmount = items => {
    let sum = 0;
    for (let item of Object.values(items)) {
        sum += item;
    }
    // console.log(sum);
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return sum+'00';
};
app.post("/api/create-payment-intent", async (req, res) => {
    const { items } = req.body;
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "aud"
    });
    res.send({
        clientSecret: paymentIntent.client_secret
    });
});
app.listen(4242, () => console.log('Node server listening on port 4242!'));