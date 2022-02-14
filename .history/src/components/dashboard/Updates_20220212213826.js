import React from 'react'

export default function Updates(props) {
    const { notifications, seen } = props;
    notifications && notifications.map(item => { 
        console.log(seen.current)
        if (!seen.current.includes(item.id)) {
            return <li key={item.id}>
            <span className='pink-text'>{item.user} </span>
            <span>{item.content} </span> 
            <div className="grey-text note-date">
            {moment(item.time.toDate()).fromNow()}
            </div>     
            <button onClick={handleClick} value={item.id}> mark as read </button>
            </li> 
        }
    
    })
}
