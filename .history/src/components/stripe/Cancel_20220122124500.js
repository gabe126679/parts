import { Link } from "react-router-dom"

const Cancel = () => {
    const cancelStyle = {
        color: 'red',
      };
    const linkStyle = {
      position: 'absolute',
      margin: "10px",
      padding: "10px",
      border: "1px solid black",
      width: "100px",
      backgroundColor: "white"
    };

    return (
      <div>
        <h1 style={cancelStyle}>Canceled</h1>
        <p>Your payment was canceled.</p>
        <br/>
          <Link style={linkStyle} to="/">home</Link>
      </div>
    );
  };
  
  export default Cancel;
  