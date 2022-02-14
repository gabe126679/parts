import { Link } from "react-router-dom"

const Cancel = () => {
    const cancelStyle = {
        color: 'red',
      };
    const linkStyle = {
      margin: "10px",
      padding: "20px",
      border: "2px solid black"
    };

    return (
      <div>
        <h1 style={cancelStyle}>Canceled</h1>
        <p>Your payment was canceled.</p>
          <Link style={linkStyle} to="/">home</Link>
      </div>
    );
  };
  
  export default Cancel;
  