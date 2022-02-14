import React from 'react'

class ProjectPurchase extends React.Component {
    render() {
    const handleClick = () => {
        console.log(this.props.project);
    }
        return (
            <div>
                <button onClick={handleClick}>hello</button>
            </div>
        )
    }
}

export default ProjectPurchase