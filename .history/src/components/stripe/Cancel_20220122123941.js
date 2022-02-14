const Cancel = () => {
    const cancelStyle = {
        color: 'red',
      };
    const messageStyle = {
      color: 'white',
    };

    return (
      <div>
        <h1 style={cancelStyle}>Cancel</h1>
        <h2 style={messageStyle}>Your payment was canceled.</h2>
      </div>
    );
  };
  
  export default Cancel;
  