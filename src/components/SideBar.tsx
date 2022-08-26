import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

//* css module:
import classes from './Sidebar.module.css';

//* heroicons:
import { ArrowCircleDownIcon } from '@heroicons/react/outline';
import { ArrowCircleUpIcon } from '@heroicons/react/outline';
import { RewindIcon } from '@heroicons/react/outline';
import { PlayIcon } from '@heroicons/react/outline';
import { PauseIcon } from '@heroicons/react/outline';

//* components:
import SidebarBackgrounDecorationComponent from "./SidebarBackgroundDecoration";

//* images:
import GalaxyPNG from '../images/space/GalaxyPNG.png';
import SpaceshipPNG from '../images/space/SpaceshipPNG.png';


const SideBar = (): JSX.Element => {
    const [workingTime, setWorkingTime] = useState<number|boolean>(60);
    const [relaxTime, setRelaxTime] = useState<number|boolean>(60);
    const [workOrRelax, setWorkOrRelax] = useState<boolean>(true)
    const [playing, setPlaying] = useState<boolean>(false);
    const darkmode = useSelector((state: RootState) => state.colorTheme.value)
    const flipBoxFront = useRef(null);
    const flipBoxBack = useRef(null);

    let workingMinutes = Math.floor(+workingTime / 60);
    let workingSeconds = (+workingTime - workingMinutes * 60);
    let formattedWorkingMinutes = workingMinutes < 10 ? "0" + workingMinutes : workingMinutes;
    let formattedWorkingSeconds = workingSeconds < 10 ? "0" + workingSeconds : workingSeconds;

    let relaxMinutes = Math.floor(+relaxTime / 60);
    let relaxSeconds = (+relaxTime - relaxMinutes * 60);
    let formattedRelaxMinutes = relaxMinutes < 10 ? "0" + relaxMinutes : relaxMinutes;
    let formattedRelaxSeconds = relaxSeconds < 10 ? "0" + relaxSeconds : relaxSeconds;

      useEffect(() => {
        const timeout = setTimeout(() => {
            if(workingTime && playing && workOrRelax){
              setWorkingTime(+workingTime - 1)
            } 
            else if (relaxTime && playing && !workOrRelax) {
              setRelaxTime(+relaxTime - 1)
            }
          }, 1000);

          if (!playing) {
            clearTimeout(timeout)
          }

          if (workingTime <= 0) {
            setWorkingTime(false);
            if (relaxTime > 0) {
              setWorkOrRelax(false);
            }
          }

          if (relaxTime <= 0) {
            setRelaxTime(false);
            if (workingTime > 0) {
              setWorkOrRelax(true);
            }
          }

          if (workingTime <= 0 && relaxTime <= 0) {
            setPlaying(false);
          }
      }, [playing, workOrRelax, workingTime, relaxTime]);

      const resetTimer = () => {
        setPlaying(false);
        setWorkingTime(600);
        setRelaxTime(600);
      }

      const gsapTimerAnimation = ({ currentTarget }: React.MouseEvent<HTMLButtonElement|HTMLDivElement, MouseEvent>, success: boolean, callback?: Function) => {        
        if (success) {
          if (darkmode) {
            let targetTimeline = gsap.timeline({});
            targetTimeline.to(currentTarget, { duration: 0.2, backgroundColor: '#7bf1a8' });
            targetTimeline.to(currentTarget, { duration: 0.2, backgroundColor: '#001233' });
            callback && callback();
          } else {
            let targetTimeline = gsap.timeline({});
            targetTimeline.to(currentTarget, { duration: 0.2, backgroundColor: '#7bf1a8' });
            targetTimeline.to(currentTarget, { duration: 0.2, backgroundColor: '#E2EAFC' });
            callback && callback();
          }
          
        } else {
          if (darkmode) {
            let targetTimeline = gsap.timeline({});
            targetTimeline.to(currentTarget, { duration: 0.2, backgroundColor: 'red' });
            targetTimeline.to(currentTarget, { duration: 0.2, backgroundColor: '#001233' });
          } else {
            let targetTimeline = gsap.timeline({});
            targetTimeline.to(currentTarget, { duration: 0.2, backgroundColor: 'red' });
            targetTimeline.to(currentTarget, { duration: 0.2, backgroundColor: '#E2EAFC' });
          }
        }
      }

      const playStopButtonHandler = (direction: string, callback?: Function) => {
        if (direction === "toStop") {
          gsap.to(".flipBoxFront", { duration: 1, rotateX: 180 });
          gsap.to(".flipBoxBack", { duration: 1, rotateX: 0 });
          console.log(flipBoxFront.current)
        } else if (direction === "toPlay") {
          gsap.to(".flipBoxFront", { duration: 1, rotateX: 0 });
          gsap.to(".flipBoxBack", { duration: 1, rotateX: 180 });
        }
        callback && callback();
      }
      
      const playStopButtonStyle = {
        color: playing ? 'black' : darkmode ? 'white' : 'black',
        backgroundColor: playing ? "#7bf1a8" : darkmode ? '#001233' : '#D7E3FC',
        minWidth: '100%',
        height: 'auto',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
        border: darkmode ? '1px solid #E2EAFC' : '1px solid black',
      }

      const workButtonStyle = {
        backgroundColor: workOrRelax ? "#7bf1a8" : darkmode ? '#001233' : '#D7E3FC',
        color: workOrRelax ? 'black' : darkmode ? 'white' : 'black',
        cursor: "pointer",
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
        border: darkmode ? '1px solid #E2EAFC' : '1px solid black',
        width: '100%',
      }

      const relaxButtonStyle = {
        backgroundColor: !workOrRelax ? "#7bf1a8" : darkmode ? '#001233' : '#D7E3FC',
        color: !workOrRelax ? 'black' : darkmode ? 'white' : 'black',
        cursor: "pointer",
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
        border: darkmode ? '1px solid #E2EAFC' : '1px solid black',
        width: '100%',
      }

      const buttonStyle = {
        backgroundColor: darkmode ? '#001233' : '#D7E3FC',
        color: darkmode ? 'white' : 'black',
        cursor: "pointer",
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
        border: darkmode ? '1px solid #E2EAFC' : '1px solid black',
        width: '100%',
      }

      const timerStylesLarge = {
        fontSize: '25px',
        color: darkmode ? 'white' : 'black',
      }
      
      const timerStylesSmall = {
        fontSize: '12.5px',
        color: darkmode ? 'white' : 'black',
      }

      const heroIconStyle = {
        width: '25px',
        height: '25px',
      }

      const heroIconStyleRevert = {
        width: '25px',
        height: '25px',
        backgroundColor: darkmode ? '#001233' : '#D7E3FC',
      }

      const sideBar = {
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
        zIndex: '9000',
        borderRadius: '35px'
      };
      
    return (
        <div className="row col-lg-8 position-relative mt-5" style={sideBar}>
          <SidebarBackgrounDecorationComponent />
          <div className="col-xl-4 d-flex justify-content-center">
            <img src={SpaceshipPNG} style={{ maxWidth: '95%', maxHeight: '350px' }}/>
          </div>
          <div className="col-xl-8 p-3">
          <div className="d-flex align-items-center flex-column row">
            <div className="col-xl-12" style={{ height: '50px', maxWidth: '250px' }}>
              <div className={classes.flipBox}>
                <div className={classes.flipBoxInner} >
                  <div className={classes.flipBoxFront + " " + "flipBoxFront"}>
                    <button style={playStopButtonStyle} className="p-2" onClick={(target) => (workingTime || relaxTime) ? playStopButtonHandler("toStop", () => setPlaying(true)) : gsapTimerAnimation(target, false)}>
                      <strong>Play</strong>
                    </button>
                  </div>
                  <div className={classes.flipBoxBack  + " " + "flipBoxBack"}>
                    <button style={playStopButtonStyle} className="p-2" onClick={(target) => (workingTime || relaxTime) ? playStopButtonHandler("toPlay", () => setPlaying(false)) : gsapTimerAnimation(target, false)}>
                      <strong>Stop</strong>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12 mt-3 d-flex align-items-center flex-column row">
              <div className="d-flex row align-items-center">
                <div className="col-lg-3">
                  <button style={buttonStyle} className="d-flex align-items-center justify-content-evenly p-2" onClick={(target) => workingTime > 60 && !playing ? gsapTimerAnimation(target, true, () => setWorkingTime(+workingTime - 60)) : gsapTimerAnimation(target, false)}>
                      <div style={heroIconStyle}>
                        <ArrowCircleDownIcon />
                      </div>
                    </button>
                </div>
                <div className="col-lg-6">
                <button style={workButtonStyle} className="d-flex align-items-center justify-content-evenly p-2" onClick={(target) => workingTime && relaxTime ? setWorkOrRelax(true) : gsapTimerAnimation(target, false)}>
                  <div style={heroIconStyle}>
                    <PlayIcon />
                  </div>
                  <div> 
                    Work Time
                  </div>
                  </button>
                </div>
                <div className="col-lg-3">
                  <button style={buttonStyle} className="d-flex align-items-center justify-content-evenly p-2" onClick={(target) => workingTime < 3600 && !playing ? gsapTimerAnimation(target, true, () => setWorkingTime(+workingTime + 60)) : gsapTimerAnimation(target, false)}>
                    <div style={heroIconStyle}>
                      <ArrowCircleUpIcon />
                    </div>
                  </button>
                </div>
              </div>
              <div className="d-flex row align-items-center mt-4">
                <div className="col-lg-3">
                  <button style={buttonStyle} className="d-flex align-items-center justify-content-evenly p-2" onClick={(target) => relaxTime > 60 && !playing ? gsapTimerAnimation(target, true, () => setRelaxTime(+relaxTime - 60)) : gsapTimerAnimation(target, false)}>
                    <div style={heroIconStyle}>
                      <ArrowCircleDownIcon />
                    </div>
                  </button>
                </div>
                <div className="col-lg-6">
                  <button style={relaxButtonStyle} className="d-flex align-items-center justify-content-evenly p-2" onClick={(target) => workingTime && relaxTime ? setWorkOrRelax(false) : gsapTimerAnimation(target, false)}>
                    <div style={heroIconStyle}>
                      <PauseIcon />
                    </div>
                    <div>
                      Relax Time
                    </div>
                  </button>
                </div>
                <div className="col-lg-3">
                  <button style={buttonStyle} className="d-flex align-items-center justify-content-evenly p-2" onClick={(target) => relaxTime < 1800 && !playing ? gsapTimerAnimation(target, true, () => setRelaxTime(+relaxTime + 60)) : gsapTimerAnimation(target, false)}>
                    <div style={heroIconStyle}>
                      <ArrowCircleUpIcon />
                    </div>
                  </button>
                </div>
              </div>
            </div>
              <div className="text-center mt-3">
                {
                workOrRelax ? 
                  workingTime ? 
                    <span style={timerStylesLarge}>{"Work for" + " " + formattedWorkingMinutes + ":" + formattedWorkingSeconds}</span> : 
                    <span style={timerStylesLarge}>{"no working time left"}</span> : 
                  relaxTime ? 
                  <span style={timerStylesLarge}>{"Relax for" + " "+ formattedRelaxMinutes + ":" + formattedRelaxSeconds}</span> : 
                  <span style={timerStylesLarge}>{"no relax time left"}</span>
                  }
              </div>
              <div className="text-center">
                {
                workOrRelax ? 
                  relaxTime ? 
                  <span style={timerStylesSmall}>{"Next: Relax for" + " " + formattedRelaxMinutes + ":" + formattedRelaxSeconds}</span> : 
                  <span style={timerStylesSmall}>{"no relax time left"}</span> : 
                  workingTime ? 
                  <span style={timerStylesSmall}>{"Next: Work for" + " "+ formattedWorkingMinutes + ":" + formattedWorkingSeconds}</span> : 
                  <span style={timerStylesSmall}>{"no working time left"}</span>
                }
              </div>
            </div>
            <div className="mx-auto"
              style={{
                height: '120px',
                width: '120px',
                backgroundColor: 'green',
                position: 'relative',
                borderRadius: '50%',
                zIndex: '1'
                }}
              >
              <div style={{
                height: 'inherit',
                width: 'inherit',
                backgroundImage: 'linear-gradient(to top, rgb(133,44,141), rgb(133,44,141))',
                backgroundSize: workOrRelax ? `100% ${workingSeconds * (5/3)}%` : `100% ${relaxSeconds * (5/3)}%`,
                backgroundRepeat: 'no-repeat',
                position: 'absolute',
                top: '0',
                right: '0',
                borderRadius: '50%',
                zIndex: '10'
                }}
              >
              </div>
              <div style={{
                height: '100px',
                width: '100px',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: darkmode ? '#001233' : '#E2EAFC',
                zIndex: '15',
                borderRadius: '50%',
                color: darkmode ? "white" : "black",
              }}
              >
                <div style={{width:'inherit', height: 'inherit', fontSize: '30px' }} className="d-flex align-items-center justify-content-center flex-column">
                  {workOrRelax ? formattedWorkingSeconds : formattedRelaxSeconds}
                  <div onClick={(target) => !playing ? gsapTimerAnimation(target, true, () => resetTimer()) : gsapTimerAnimation(target, false)} style={heroIconStyleRevert} className="d-flex justify-content-center align-items-center rounded-circle">
                    <RewindIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default SideBar;