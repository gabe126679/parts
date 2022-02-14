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
      </div>
    );
  };
  
  export default Cancel;
  