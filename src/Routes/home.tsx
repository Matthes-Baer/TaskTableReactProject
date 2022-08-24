import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addActiveTodo } from "../features/ActiveTodosSlice";
import { RootState } from "../app/store";
import { gsap } from "gsap";


import { changeColorTheme } from "../features/ColorSlice";

// Components:
import Checkbox from "../components/Checkbox";
import SideBar from '../components/SideBar';
import HeaderElement from '../components/HeaderElement';
import TodoTaskContainer from '../components/TodoTaskContainer'
import CompletedTaskContainer from '../components/CompletedTaskContainer';
import TasksLeftSide from '../components/TasksLeftSide';
import TasksRightSide from '../components/TasksRightSide';

import landscape from '../images/landscape.jpg';
import bears from '../images/winterBears.jpg';
import winterLandscape from '../images/winterLandscape.jpg';
import { changeCurrentTime } from "../features/CurrentTimeSlice";
import InnerContainerBackgroundStuff from "../components/InnerContainerBackgroundStuff";

// COLORS:
// https://coolors.co/palette/edf2fb-e2eafc-d7e3fc-ccdbfd-c1d3fe-b6ccfe-abc4ff
// green: #7bf1a8
// red: #ee6055
// akzent: #EC214E / 'rgb(133,44,141)'

const HomeRoute = () => {
    const darkmode = useSelector((state: RootState) => state.colorTheme.value)
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(
            'Todo: transitions, background, colors, Aufräumen'
        )
    }, [])

    //* Automatische Updates für aktuelle letzte Zeiten
    const interval = setInterval(() => {
        dispatch(changeCurrentTime(new Date().getTime() / 1000 / 60));
        console.log("update")
    }, 60000)
  
    const mainContainer = {
        backgroundColor: darkmode ? '#001233' : '#EDF2FB',
        minHeight: '150vh',
        backgroundImage: `url(${landscape})`,
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundPosition: darkmode ? 'top' : 'bottom',
        transition: '.5s',
    };

    const innerContainer = {
        backgroundColor: darkmode ? '#023E7D' : '#D7E3FC',
        minHeight: '90vh',
        width: '75vw',
        outline: darkmode ? '20px solid #002855' : '20px solid #E2EAFC',
        borderRadius: '15px',
    };

    const tasksLeftSide = {
        border: darkmode ? '2px solid #EDF2FB' : '2px solid black',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
        backgroundColor: darkmode ? '#001233' : '#ABC4FF',
        color: darkmode ? 'white' : 'black',
    }

    const tasksRightSide = {
        border: darkmode ? '2px solid #EDF2FB' : '2px solid black',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
        backgroundColor: darkmode ? '#001233' : '#ABC4FF',
        color: darkmode ? 'white' : 'black',
    }
  
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" style={mainContainer}>
            <div style={innerContainer} className="d-flex justify-content-evenly row mt-5 mb-5 position-relative">
                <HeaderElement />
                <SideBar />
                <InnerContainerBackgroundStuff />
                <div className="row col-lg-12 d-flex align-items-start justify-content-evenly mt-5 mb-5" style={{zIndex: 5}}>
                    <div className="col-lg-5 rounded" style={tasksLeftSide}>
                        <TasksLeftSide />
                    </div>
                    <div className="col-lg-5 rounded align-self-end position-relative" style={tasksRightSide}>
                        <TasksRightSide />
                    </div>
                    {/* <button onClick={() => localStorage.clear}>CLEAR HERE</button> */}
                </div> 
            </div>
        </div>
    )
}

export default HomeRoute;