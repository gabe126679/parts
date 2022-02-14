import React from 'react'

export default class ProjectPurchase extends React.Component {
    render() {
    const handleClick = () => {
        console.log(this.project);
    }
        return (
            <div>
                <button onClick={handleClick}>hello</button>
            </div>
        )
    }
}

