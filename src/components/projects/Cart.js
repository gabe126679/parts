import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faCommentDollar } from '@fortawesome/free-solid-svg-icons';
import { updateCart } from '../../store/actions/authActions';


const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#000",
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

const Cart = (props) => {

    const { projects, users, auth } = props;

    const [success, setSuccess ] = useState(false)
    const [items, setItems ] = useState([]);
    const [total, setTotal ] = useState(0);
    const stripe = useStripe()
    const elements = useElements()

    let counter = 0;

    useEffect(async () => {
        
        users.map((user) => {
            if (auth.uid === user.id) {
                user.cartItems.map((item) => {
                    projects.map((project) => {
                        
                        if (items && project.id === item.id && items.length <= 0) {
                            const newPrice = project.price.split("$").join("").split(".").join("");
                            const newTotal = parseInt(newPrice)
                            counter += newTotal;
                            setTotal(counter);

                            const newProject = 
                            {
                                id: project.id,
                                price: project.price,
                                title: project.title,
                                photos: project.photos,
                                authorFirstName: project.authorFirstName,
                                authorLastName: project.authorLastName,
                                upvoteCount: project.upvoteCount,
                                createdAt: project.createdAt,
                                count: 1
                            } 
                            setItems(items => ([...items, newProject]));                                
                        }
                    });
                }) 
            }
        })
    });

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
                    amount: total,
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


    const handleIncrease = (e) => {
        e.preventDefault()
        items.map((item) => {
            if (item.id === e.target.id && total >= 0) {
                const newPrice = item.price.split("$").join("").split(".").join("");

                const newTotal = parseInt(newPrice)
                setTotal(total + newTotal);
                item.count += 1;
            }
        })
    }

    const handleDecrease = (e) => {
        e.preventDefault()
        items.map((item) => {
            const newPrice = item.price.split("$").join("").split(".").join("");
            if (item.id === e.target.id && total >= newPrice) {

                const newTotal = parseInt(newPrice)
                counter -= newTotal;
                setTotal(total - newTotal);
                item.count -= 1;
            }
        })
    }

    const handleDelete = (e) => {
        e.preventDefault();

        items.map((item) => {
            if (item.id === e.target.id) {
                props.updateCart(item.id, item.price);
            }
        })

        const newItems = items.filter((item) => {
            if (item.id === e.target.id) {
                const newPrice = item.price.split("$").join("").split(".").join("");
                const newTotal = parseInt(newPrice)
                setTotal(total - newTotal);

            }
            return item.id !== e.target.id;
        })
        setItems(newItems);
    }




    const clientString = "$" + total.toString().slice(0, -2);

    return (
        <>
        {!success ? 
        <div className="container">
            <br/>
            <div className="center">
                    <div>
                    <div className="category-tag container center">
                        <h4 className="category-text black-text"> Total: {clientString}</h4>
                    </div>
                        {items.map((item) => {
                            return <div className="container">
                            <div className="card black z-depth-0 project-sumarry">
                                <div className="card-content white-text text-darken-3">
                                <span className="card-title">{item.title}</span>
                                <p>Posted by {item.authorFirstName} {item.authorLastName}</p>
                                <h3>{item.price}</h3>
                                <p className="grey-text">{moment(item.createdAt.toDate()).calendar()}</p>
                                    <p className="right-align">{item.upvoteCount} <FontAwesomeIcon style={{color: "grey"}} icon={faArrowUp} /> </p>
                                <div className="card-image">
                                    <img className="project-img" alt="Responsive Image" src={item.photos}/>
                                </div>
                                </div>
                            </div>           
                            <div className="category-text center" >{item.count}</div>
                            <button className="btn btn-two" id={item.id} onClick={handleIncrease}>increase quantity</button>
                            <button className="btn btn-two" id={item.id} onClick={handleDecrease}>decrease quantity</button>
                            <button className="btn btn-three" id={item.id} onClick={handleDelete}>X</button>
                            <br/>
                            <br/>
                            </div>
                            
                        })}
                    </div>
                    
                    <div className="category-tag container center">
                        <h4 className="category-text black-text"> Total: {clientString}</h4>
                    </div>
                    <br/>
                </div>
                
            <form onSubmit={handleSubmit}>
                <fieldset className="FormGroup">
                    <div className="FormRow">
                        <p>First Name:</p>
                        <input type="text" />
                    </div>
                    <br/>
                    <div className="FormRow">
                        <p>Last Name:</p>
                        <input type="text" />
                    </div>
                    <div className="FormRow">
                        <p>Email:</p>
                        <input type="text" />
                    </div>
                    <br/>
                    <div className="FormRow">
                        <CardElement options={CARD_OPTIONS}/>
                        <br/>
                    </div>
                </fieldset>
                <button >Pay</button>
            </form>
        </div>
        :
       <div>
           <h2>You just bought a sweet spatula congrats this is the best decision of you're life</h2>
       </div> 
        }

        </>
    )
}

const mapStateToProps = (state) => {

    return {
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth,
        users: state.firestore.ordered.users,
    }
    
}

const mapDispatchToProps = dispatch => {

    return {
        updateCart: (item, price) => dispatch(updateCart(item, price))
    }
}
  
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
    { collection: 'projects'},
    { collection: 'users'}
    ])
)(Cart);