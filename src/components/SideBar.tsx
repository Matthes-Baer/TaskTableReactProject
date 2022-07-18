import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

//* css module
import classes from './Sidebar.module.css';

//* heroicons:
import { ArrowCircleDownIcon } from '@heroicons/react/outline';
import { ArrowCircleUpIcon } from '@heroicons/react/outline';
import { RewindIcon } from '@heroicons/react/outline';
import { PlayIcon } from '@heroicons/react/outline';
import { PauseIcon } from '@heroicons/react/outline';

//* components
import SidebarBackgrounDecorationComponent from "./SidebarBackgroundDecoration";


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
            targetTimeline.to(currentTarget, { duration: 0.5, backgroundColor: '#7bf1a8' });
            targetTimeline.to(currentTarget, { duration: 0.5, backgroundColor: '#001233' });
            callback && callback();
          } else {
            let targetTimeline = gsap.timeline({});
            targetTimeline.to(currentTarget, { duration: 0.5, backgroundColor: '#7bf1a8' });
            targetTimeline.to(currentTarget, { duration: 0.5, backgroundColor: '#ABC4FF' });
            callback && callback();
          }
          
        } else {
          if (darkmode) {
            let targetTimeline = gsap.timeline({});
            targetTimeline.to(currentTarget, { duration: 0.5, backgroundColor: 'red' });
            targetTimeline.to(currentTarget, { duration: 0.5, backgroundColor: '#001233' });
          } else {
            let targetTimeline = gsap.timeline({});
            targetTimeline.to(currentTarget, { duration: 0.5, backgroundColor: 'red' });
            targetTimeline.to(currentTarget, { duration: 0.5, backgroundColor: '#ABC4FF' });
          }
        }
      }

      const playStopButtonHandler = (direction: string, callback?: Function) => {
        if (direction === "toStop") {
          gsap.to(flipBoxFront.current, { duration: 1, transform: 'rotateX(180deg)' });
          gsap.to(flipBoxBack.current, { duration: 1, transform: 'rotateX(0deg)' });
        } else if (direction === "toPlay") {
          gsap.to(flipBoxFront.current, { duration: 1, transform: 'rotateX(0deg)' });
          gsap.to(flipBoxBack.current, { duration: 1, transform: 'rotateX(180deg)' });
        }
        callback && callback();
      }
      
      const playStopButtonStyle = {
        color: playing ? 'black' : darkmode ? 'white' : 'black',
        transition: 'all .5s',
        backgroundColor: playing ? "#7bf1a8" : darkmode ? '#001233' : '#ABC4FF',
        minWidth: '100%',
        height: 'auto',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
        border: darkmode ? '1px solid #E2EAFC' : '1px solid black',
      }

      const workButtonStyle = {
        backgroundColor: workOrRelax ? "#7bf1a8" : darkmode ? '#001233' : '#ABC4FF',
        color: workOrRelax ? 'black' : darkmode ? 'white' : 'black',
        cursor: "pointer",
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
        border: darkmode ? '1px solid #E2EAFC' : '1px solid black',
      }

      const relaxButtonStyle = {
        backgroundColor: !workOrRelax ? "#7bf1a8" : darkmode ? '#001233' : '#ABC4FF',
        color: !workOrRelax ? 'black' : darkmode ? 'white' : 'black',
        cursor: "pointer",
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
        border: darkmode ? '1px solid #E2EAFC' : '1px solid black',
      }

      const iconImageStyles = {
        width: "25px",
        height: "25px",
        filter: 'drop-shadow(1px 4px 6px rgba(0, 0, 0, 0.3))',
      }

      const buttonStyle = {
        backgroundColor: darkmode ? '#001233' : '#ABC4FF',
        color: darkmode ? 'white' : 'black',
        cursor: "pointer",
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
        border: darkmode ? '1px solid #E2EAFC' : '1px solid black',
      }

      const timerStylesLarge = {
        fontSize: '25px',
      }
      
      const timerStylesSmall = {
        fontSize: '12.5px',
      }

      const heroIconStyle = {
        width: '25px',
        height: '25px'
      }
      
    return (
        <div className="row d-flex flex-column justify-content-center align-items-center position-relative">
          <SidebarBackgrounDecorationComponent />
          <div className="d-flex justify-content-evenly align-items-center flex-column p-3 row">
              <div className="col-lg-12" style={{height: '25px'}}>
                <div className={classes.flipBox}>
                  <div className={classes.flipBoxInner} >
                    <div className={classes.flipBoxFront} ref={flipBoxFront}>
                      <button style={playStopButtonStyle} onClick={(target) => workingTime || relaxTime ? playStopButtonHandler("toStop", () => setPlaying(true)) : gsapTimerAnimation(target, false)}>
                        <strong>Play</strong>
                      </button>
                    </div>
                    <div className={classes.flipBoxBack} ref={flipBoxBack}>
                      <button style={playStopButtonStyle} onClick={(target) => workingTime || relaxTime ? playStopButtonHandler("toPlay", () => setPlaying(false)) : gsapTimerAnimation(target, false)}>
                        <strong>Stop</strong>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            <div className="col-lg-12 mt-3 d-flex justify-content-evenly flex-column">
              <button style={workButtonStyle} className="d-flex justify-content-evenly p-2" onClick={(target) => workingTime && relaxTime ? setWorkOrRelax(true) : gsapTimerAnimation(target, false)}>
                <div style={heroIconStyle}>
                  <PlayIcon />
                </div>
                <div>WORK</div>
              </button>
              <button style={relaxButtonStyle} className="mt-3 d-flex justify-content-evenly p-2" onClick={(target) => workingTime && relaxTime ? setWorkOrRelax(false) : gsapTimerAnimation(target, false)}>
                <div style={heroIconStyle}>
                  <PauseIcon />
                </div>
                <div>RELAX</div>
              </button>
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
            <div 
              style={{
                height: '120px',
                width: '120px',
                backgroundColor: 'green',
                transition: 'all 0.5s',
                position: 'relative',
                borderRadius: '50%',
                zIndex: '1'
                }}
              >
              <div style={{
                height: 'inherit',
                width: 'inherit',
                backgroundImage: 'linear-gradient(to top, red, red)',
                backgroundSize: workOrRelax ? `100% ${workingSeconds * (5/3)}%` : `100% ${relaxSeconds * (5/3)}%`,
                backgroundRepeat: 'no-repeat',
                transition: 'all 0.5s',
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
                backgroundColor: '#B6CCFE',
                zIndex: '15',
                borderRadius: '50%'
              }}
              >
                <div style={{width:'inherit', height: 'inherit', fontSize: '30px' }} className="d-flex align-items-center justify-content-center">
                  {workOrRelax ? formattedWorkingSeconds : formattedRelaxSeconds}
                </div>
              </div>
            </div>
            {/* <button onClick={(target) => workingTime && relaxTime ? setWorkOrRelax(!workOrRelax) : limitAnimation(target)}>Relax/Work</button> */}
            <div className="col-lg-12 mt-3 row d-flex align-items-center flex-column">
              <div className="col-lg-12 row justify-content-center d-flex">
                <button style={buttonStyle} className="col-xl-6 d-flex justify-content-evenly p-2 m-1" onClick={(target) => workingTime >= 120 && !playing ? gsapTimerAnimation(target, true, () => setWorkingTime(+workingTime - 60)) : gsapTimerAnimation(target, false)}>
                  <div style={heroIconStyle}>
                    <ArrowCircleDownIcon />
                  </div>
                  <div>Work</div>
                </button>
                <button style={buttonStyle} className="col-xl-6 d-flex justify-content-evenly p-2 m-1" onClick={(target) => workingTime < 3600 && !playing ? gsapTimerAnimation(target, true, () => setWorkingTime(+workingTime + 60)) : gsapTimerAnimation(target, false)}>
                  <div style={heroIconStyle}>
                    <ArrowCircleUpIcon />
                  </div>
                  <div>Work</div>
                </button>
              </div>
              <div className="col-lg-12 mt-2 row justify-content-center d-flex">
                <button style={buttonStyle} className="col-xl-6 d-flex justify-content-evenly p-2 m-1" onClick={(target) => relaxTime >= 120 && !playing ? gsapTimerAnimation(target, true, () => setRelaxTime(+relaxTime - 60)) : gsapTimerAnimation(target, false)}>
                  <div style={heroIconStyle}>
                    <ArrowCircleDownIcon />
                  </div>
                  <div>Relax</div>
                </button>
                <button style={buttonStyle} className="col-xl-6 d-flex justify-content-evenly p-2 m-1" onClick={(target) => relaxTime < 1800 && !playing ? gsapTimerAnimation(target, true, () => setRelaxTime(+relaxTime + 60)) : gsapTimerAnimation(target, false)}>
                  <div style={heroIconStyle}>
                    <ArrowCircleUpIcon />
                  </div>
                  <div>Relax</div>
                </button>
              </div>
              <div className="col-lg-12 mt-4 mb-3 row justify-content-center d-flex">
                <button style={buttonStyle} className="col-xl-6 d-flex justify-content-evenly p-2" onClick={(target) => !playing ? gsapTimerAnimation(target, true, () => resetTimer()) : gsapTimerAnimation(target, false)}>
                  <div style={heroIconStyle}>
                    <RewindIcon />
                  </div>
                  <div>Reset</div>
                </button>
              </div>      
            </div>
        </div>
    )
}

export default SideBar;