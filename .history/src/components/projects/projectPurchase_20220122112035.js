import React from 'react'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class ProjectPurchase extends React.Component {
    
    
  render() {
    const { project } = this.props; 
    const handleClick = () => {
        console.log(this.props);
    }
        //stripe payments
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
        return (
            <div className="checkout">
            <h1>Stripe Checkout</h1>
            <p className="checkout-title">Design+Code React Hooks Course</p>
            <p className="checkout-description">
              Learn how to build a website with React Hooks
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
            // <div>
            //     <button onClick={handleClick}>hello</button>
            //     <h2>{project.price}</h2>
                
            // </div>
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
