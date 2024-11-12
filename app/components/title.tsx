import React from 'react'

interface TitleProps {
    name: string;
}

const Title: React.FC<TitleProps> = ({ name }) => {
    return (
        <div>
            <div className="title">
                <div className="grid"></div>
                <div className="tRow">{name}</div>
            </div>
        </div>
    )
}

export default Title;