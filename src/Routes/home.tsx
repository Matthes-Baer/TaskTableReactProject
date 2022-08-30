import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Helmet } from "react-helmet";

import SideBar from '../components/SideBar';
import HeaderElement from '../components/HeaderElement';
import TasksLeftSide from '../components/TasksLeftSide';
import TasksRightSide from '../components/TasksRightSide';

import landscape from '../images/landscape.jpg';
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

    //* Automatische Updates für aktuelle letzte Zeiten
    const interval = setInterval(() => {
        dispatch(changeCurrentTime(new Date().getTime() / 1000 / 60));
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
        borderRadius: '15px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.25)',
    };

    const tasksLeftSide = {
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
        backgroundColor: darkmode ? '#001233' : '#E2EAFC',
        color: darkmode ? 'white' : 'black',
        borderRadius: '35px',
    }

    const tasksRightSide = {
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
        backgroundColor: darkmode ? '#001233' : '#E2EAFC',
        color: darkmode ? 'white' : 'black',
        borderRadius: '35px',
    }
  
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" style={mainContainer}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Task Tour React Portfolio Project</title>
                <meta name="description" content="A React Project for my portfolio"/>
            </Helmet>
            <div style={innerContainer} className="d-flex justify-content-evenly row mt-5 mb-5 position-relative p-3">
                <HeaderElement />
                <SideBar />
                <InnerContainerBackgroundStuff />
                <div className="row col-lg-12 d-flex align-items-start justify-content-evenly mt-5 mb-3" style={{zIndex: 5}}>
                    <div className="col-lg-5" style={tasksLeftSide}>
                        <TasksLeftSide />
                    </div>
                    <div className="col-lg-5 align-self-end position-relative mt-4" style={tasksRightSide}>
                        <TasksRightSide />
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default HomeRoute;