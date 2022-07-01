import React, { PropsWithChildren } from "react";

const HeaderElement = ():JSX.Element => {
    return (
        <>
            <div className="d-flex">
                <div style={sideEffect}></div>
                <h1>Task Tour</h1>
            </div>
        </>
    )
}

const sideEffect = {
    width: '10px',
    height: 'auto',
    backgroundColor: '#bbe9db',
    borderRadius: '10px 0 0 10px',
    marginRight: '10px'
}

export default HeaderElement;