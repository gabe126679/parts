import React from 'react'

export default function projectPurchase({project}) {
    const handleClick = () => {
        console.log(project);
    }
    return (
        <div>
            <button onClick={handleClick}>hello</button>
        </div>
    )
}
