import React, { useState } from 'react'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useElements, useStripe, Elements } from "@stripe/react-stripe-js"
import axios from "axios"
import CardIcon from "../images/credit-card.svg";

import "../styles.css";

let stripePromise;

const PUBLIC_KEY = "pk_test_51KKltgFxVZy3GzJLkD3qdblg4JHaGYedZsHq7KNCctRB04mWxJVi5ZrRKmu0ShXe2cIcA6NTtIOE51ht6V974QIZ00H1hiCCUS"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

const Wrapper = (props) => (
    <Elements stripe={stripeTestPromise}>
      <ProjectPurchase {...props} />
    </Elements>
  );

const getStripe = () => {
if (!stripePromise) {
    stripePromise = loadStripe("pk_test_51KKltgFxVZy3GzJLkD3qdblg4JHaGYedZsHq7KNCctRB04mWxJVi5ZrRKmu0ShXe2cIcA6NTtIOE51ht6V974QIZ00H1hiCCUS");
  }

  return stripePromise;
}

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

const ProjectPurchase = (props) =>  {
    // const [stripeError, setStripeError] = useState(null);
    // const [isLoading, setLoading] = useState(false);
    const [success, setSuccess ] = useState(false);
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })


    if(!error) {
        try {
            const {id} = paymentMethod
            const response = await axios.post("http://localhost:4000/payment", {
                amount: 1000,
                id
            })

            if(response.data.success) {
                console.log("Successful payment")
                setSuccess(true)
            }

        } catch (error) {
            console.log("Error", error)
        }
    } else {
        console.log(error.message)
    }
}
    
    const { project } = props; 
        // stripe payments
    // const item = {
    //   price: "price_1KKlx9FxVZy3GzJLqlfy1sBl",
    //   quantity: 1
    // };

    // const checkoutOptions = {
    //   lineItems: [item],
    //   mode: "payment",
    //   successUrl: `${window.location.origin}/success`,
    //   cancelUrl: `${window.location.origin}/cancel`
    // };
  
    // const redirectToCheckout = async () => {
    //   setLoading(true);
    //   console.log("redirectToCheckout");
  
    //   const stripe = await getStripe();
    //   const { error } = await stripe.redirectToCheckout(checkoutOptions);
    //   console.log("Stripe checkout error", error);
  
    //   if (error) setStripeError(error.message);
    //   setLoading(false);
    // };
  
    // if (stripeError) alert(stripeError);



    if (project) {
    return (
       
        <>
        {!success ? 
        <form onSubmit={handleSubmit}>
            <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
            <button>Pay</button>
        </form>
            :
        <div>
            <h2>You just bought a sweet spatula congrats this is the best decision of you're life</h2>
        </div> 
            }
            
        </>
    
        //   <div className="checkout">
        //     <h1>Stripe Checkout</h1>
        //     <p className="checkout-title">{project.title}</p>
        //     <p className="checkout-description">
        //       {project.content}
        //     </p>
        //     <h1 className="checkout-price">{project.price}</h1>
        //     <button
        //       className="checkout-button"
        //       onClick={redirectToCheckout}
        //       disabled={isLoading}
        //     >
        //       <div className="grey-circle">
        //         <div className="purple-circle">
        //           <img className="icon" src={CardIcon} alt="credit-card-icon" />
        //         </div>
        //       </div>
        //       <div className="text-container">
        //         <p className="text">{isLoading ? "Loading..." : "Buy"}</p>
        //       </div>
        //     </button>
        //   </div>

        )
    }   else {
        return (
          <div>
           <h5> loading... </h5>
          </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const projects = state.firestore.data.projects;
    const project = projects ? projects[id] : null
    return {
      project: project,
      auth: state.firebase.auth
    }
  }

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{
      collection: 'projects'
    }])
  )(ProjectPurchase)
