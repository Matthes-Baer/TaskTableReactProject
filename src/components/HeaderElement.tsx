import React, { PropsWithChildren, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";

import { changeColorTheme } from "../features/ColorSlice";

import logo from '../images/logo.jpg';

import EarthPNG from '../images/space/EarthPNG.png';
import MoonPNG from '../images/space/MoonPNG.png';

const HeaderElement = ():JSX.Element => {
    const [today, setToday] = useState(new Date().toLocaleDateString('de-DE', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }));
    const darkmode = useSelector((state: RootState) => state.colorTheme.value);
    const dispatch = useDispatch();

    const changer = () => {
        if (darkmode) {
            localStorage.setItem('darkmode', JSON.stringify(false));
        }
        else {
            localStorage.setItem('darkmode', JSON.stringify(true))
        }
        dispatch(changeColorTheme(JSON.parse(localStorage.getItem('darkmode') || "{}")))
    }

    const headerElement = {
        backgroundImage: darkmode ? 'linear-gradient(to right, #002855, #0353A4, #0353A4, #002855)' : 'linear-gradient(to right, #E2EAFC, #B6CCFE, #B6CCFE, #E2EAFC)',
        color: darkmode ? 'white' : 'black',
        minHeight: '100px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    }

    const darkmodeSwitcherStyle = {
        borderRadius: '50%',
        transform: darkmode ? 'rotate(-90deg)' : 'rotate(90deg)',
        width: '50px',
        height: '50px',
        backgroundColor: darkmode ? '#33415C' : '#0353A4',
    }


    return (
        <div style={headerElement} className="row d-flex align-items-center justify-content-between">
            <div className="d-flex col-sm-8 justify-content-start">
                <div className="ms-1" style={backgroundLogoStyle}></div>
                <div className="ms-3" style={sideEffect}></div>
                <h1 className="align-self-center">Task Tour</h1>
            </div>
            <div className="d-flex col-sm-3 justify-content-end">
                <div onClick={changer} className="d-flex me-3" style={darkmodeSwitcherStyle}>
                    <img src={darkmode ? MoonPNG : EarthPNG} />
                </div>
                <div style={sideEffect}></div>
                <div style={timeStyle} className="p-2">{today}</div>
            </div>
        </div>
    )
}

const sideEffect = {
    width: '10px',
    height: 'auto',
    backgroundColor: '#EC214E',
    borderRadius: '10px 0 0 10px',
    marginRight: '10px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
}

const timeStyle = {
    fontSize: '25px',
    fontWeight: 'bold'
}

const backgroundLogoStyle = {
    backgroundImage: `url(${logo})`, 
    backgroundPosition: 'center',  
    backgroundSize: '100% 100%', 
    width: '80px', 
    height: '80px',
    borderRadius: '50%',
    backgroundRepeat: 'no-repeat',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
}

export default HeaderElement;