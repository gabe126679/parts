// const express = require("express")
// const app = express()
// require("dotenv").config("sk_test_51KKltgFxVZy3GzJLNcpi4GIud3ZOg8ZS10CMAsHv6ww6KmQOjDQ2xl710GZgm3UDLHXCUxefU7Cys6CfQYMPTHlk00Jhgd1Dwc")
// const stripe = require("stripe")()
// const bodyParser = require("body-parser")
// const cors = require("cors")

// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())

// app.use(cors())

// app.post("/payment", cors(), async (req, res) => {
// 	let { amount, id } = req.body
// 	try {
// 		const payment = await stripe.paymentIntents.create({
// 			amount,
// 			currency: "USD",
// 			description: "Spatula company",
// 			payment_method: id,
// 			confirm: true
// 		})
// 		console.log("Payment", payment)
// 		res.json({
// 			message: "Payment successful",
// 			success: true
// 		})
// 	} catch (error) {
// 		console.log("Error", error)
// 		res.json({
// 			message: "Payment failed",
// 			success: false
// 		})
// 	}
// })

// app.listen(process.env.PORT || 4000, () => {
// 	console.log("Sever is listening on port 4000")
// })