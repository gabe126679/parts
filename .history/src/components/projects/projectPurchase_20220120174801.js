import React from 'react'

const ProjectPurchase = ({project}) => {
    const handleClick = () => {
        console.log(project);
    }
    return (
        <div>
            <button onClick={handleClick}>hello</button>
        </div>
    )
}

export default ProjectPurchase