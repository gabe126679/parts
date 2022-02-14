import React, { useState } from 'react'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { loadStripe } from "@stripe/stripe-js";

import CardIcon from "../images/credit-card.svg";

let stripePromise;

const getStripe = () => {
if (!stripePromise) {
    stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
  }

  return stripePromise;
}

const ProjectPurchase = (props) =>  {
    const [stripeError, setStripeError] = useState(null);
    const [isLoading, setLoading] = useState(false);
  
    const { project } = props; 
        // stripe payments
    const item = {
      price: "price_1K3TfMA4B8Maa00LFZ4EFwdX",
      quantity: 1
    };

    const checkoutOptions = {
      lineItems: [item],
      mode: "payment",
      successUrl: `${window.location.origin}/success`,
      cancelUrl: `${window.location.origin}/cancel`
    };
  
    const redirectToCheckout = async () => {
      setLoading(true);
      console.log("redirectToCheckout");
  
      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout(checkoutOptions);
      console.log("Stripe checkout error", error);
  
      if (error) setStripeError(error.message);
      setLoading(false);
    };
  
    if (stripeError) alert(stripeError);

    console.log(products);
    console.log(props.match.params.id);

    if (product) {
    return (
          <div className="checkout">
            <h1>Stripe Checkout</h1>
            <p className="checkout-title">{project.title}</p>
            <p className="checkout-description">
              {project.content}
            </p>
            <h1 className="checkout-price">{project.price}</h1>
            <button
              className="checkout-button"
              onClick={redirectToCheckout}
              disabled={isLoading}
            >
              <div className="grey-circle">
                <div className="purple-circle">
                  <img className="icon" src={CardIcon} alt="credit-card-icon" />
                </div>
              </div>
              <div className="text-container">
                <p className="text">{isLoading ? "Loading..." : "Buy"}</p>
              </div>
            </button>
          </div>

        )
    }   else {
        return (
          <div>
           <h3> Timeout! </h3>
           <h2> Return to Product: </h2>
            <Link to={'/project/' + props.match.params.id} className="btn purple lighten-1" style={button2Style}>
            go back       
            </Link>
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
