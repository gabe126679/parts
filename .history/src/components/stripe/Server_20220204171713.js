const cors = require('cors');
const express = require('express');
const stripe = require('stripe')("sk_test_51KKltgFxVZy3GzJLNcpi4GIud3ZOg8ZS10CMAsHv6ww6KmQOjDQ2xl710GZgm3UDLHXCUxefU7Cys6CfQYMPTHlk00Jhgd1Dwc");
const uuid = require("uuid/v4");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("hello there");
})

app.post('/projectCheckout', async (req, res) => {
    console.log("Request:", req.body);

    let error;
    let status;
    try {
        const { token } = req.body;

        const customer = await 
        stripe.customers.create({
            email: token.email,
            source: token.id
        })
        const idempotency_key = uuid();
        const charge = await stripe.charges.create({
            amount: product.price * 100,
            currency: "usd",
            customer: customer.id,
            description: `Purchased the ${product.name}`,
            shipping: {
                name: token.card.name,
                addresses: {
                    line1: token.card.line1,
                    line2: token.card.line2,
                    city: token.card.address_line1,
                    city: token.card.addresses_city,
                    country: token.card.addresses.country,
                    postal_code: token.card.address_zip
                }
            }
        },
        {
            idempotency_key
        }
    );
        console.log("Charge:", { charge });
        status = "success";
    }   catch (error) {
        console.error("Error:", error);
        status = "failure";
    }

    res.json({ error, status })
})

app.listen(3000);