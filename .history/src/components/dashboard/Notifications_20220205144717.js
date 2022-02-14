import moment from 'moment';
import React from 'react';
import { connect } from "react-redux";


const Notifications = (props) => {
  const { notifications } = props;


  return (
    <div className="section">
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title">Notifications</span>
          <ul className="online-users">
            { notifications && notifications.map(item => { 
              return <li key={item.id}>
                {/* <span className='pink-text'>{(() => {
                  if (item.content === "Added a new project") {
                    return item.user + " ";
                  } else {
                    return "a new user ";
                  }})()}  */}
                <span className='pink-text'>{item.user} </span>
                <span>{item.content} </span>
                <div className="grey-text note-date">
                  {moment(item.time.toDate()).fromNow()}
                </div>
              </li>  
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state.firebase.ordered.notifications);
  return {
    notifications: state.firestore.ordered.notifications
  }
}

export default connect(mapStateToProps)(Notifications);