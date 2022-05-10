import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

const PUBLIC_KEY = "pk_test_51KKltgFxVZy3GzJLkD3qdblg4JHaGYedZsHq7KNCctRB04mWxJVi5ZrRKmu0ShXe2cIcA6NTtIOE51ht6V974QIZ00H1hiCCUS"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

function StripeContainer() {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm />
		</Elements>
	)
}

export default StripeContainer;