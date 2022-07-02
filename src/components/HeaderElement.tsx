import React, { PropsWithChildren, useState } from "react";

const HeaderElement = ():JSX.Element => {
    const [today, setToday] = useState(new Date());

    const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

    return (
        <div style={headerElement} className="d-flex align-items-center justify-content-between">
            <div className="d-flex">
                <div style={sideEffect}></div>
                <h1>Task Tour</h1>
            </div>

            <div className="d-flex">
                <div style={sideEffect}></div>
                <div style={timeStyle} className="p-2">{`${today.getDate()}. ${months[today.getMonth()]} ${today.getFullYear()}`}</div>
            </div>

            
        </div>
    )
}

const headerElement = {
    backgroundColor: '#B6CCFE',
    height: '100px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
}

const sideEffect = {
    width: '10px',
    height: 'auto',
    backgroundColor: '#ff7070',
    borderRadius: '10px 0 0 10px',
    marginRight: '10px',
}

const timeStyle = {
    fontSize: '25px',
    fontWeight: 'bold'
}

export default HeaderElement;