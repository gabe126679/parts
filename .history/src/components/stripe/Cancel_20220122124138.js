import { Link } from "react-router-dom"

const Cancel = () => {
    const cancelStyle = {
        color: 'red',
      };
    const linkStyle = {
      color: 'white',
    };

    return (
      <div>
        <h1 style={cancelStyle}>Canceled</h1>
        <p>Your payment was canceled.</p>
        <div>
          <Link to="/">home</Link>
        </div>
      </div>
    );
  };
  
  export default Cancel;
  