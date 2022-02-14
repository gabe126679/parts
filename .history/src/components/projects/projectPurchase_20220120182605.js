import React from 'react'

export class ProjectPurchase extends React.Component {
    render() {
    const handleClick = () => {
        console.log(props.project);
    }
        return (
            <div>
                <button onClick={handleClick}>hello</button>
            </div>
        )
    }
}