import { Link } from "react-router-dom"

const Cancel = () => {
    const cancelStyle = {
        color: 'red',
      };
    const messageStyle = {
      color: 'white',
    };

    return (
      <div>
        <h1 style={cancelStyle}>Canceled</h1>
        <p>Your payment was canceled.</p>
        <Link to="/">home</Link>
      </div>
    );
  };
  
  export default Cancel;
  