import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

import workIconImage from '../images/work-icon.png';
import relaxIconImage from '../images/relax-icon.png';

const SideBar = (): JSX.Element => {
    const [workingTime, setWorkingTime] = useState<number|boolean>(60);
    const [relaxTime, setRelaxTime] = useState<number|boolean>(60);
    const [workOrRelax, setWorkOrRelax] = useState<boolean>(true)
    const [playing, setPlaying] = useState<boolean>(false);
    const darkmode = useSelector((state: RootState) => state.colorTheme.value)

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

      const limitAnimation = ({ currentTarget }: React.MouseEvent<HTMLButtonElement|HTMLDivElement, MouseEvent>) => {
        const baseColor = currentTarget.style.backgroundColor;
        console.log(baseColor)
        let targetTimeline = gsap.timeline({});
        targetTimeline.to(currentTarget, { duration: 0.5, backgroundColor: 'red' });
        targetTimeline.to(currentTarget, { duration: 0.5, backgroundColor: 'yellow' });
      }
      
      const playStopButtonStyle = {
        color: playing ? 'black' : darkmode ? 'white' : 'black',
        transition: 'all .5s',
        backgroundColor: playing ? "#7bf1a8" : darkmode ? '#001233' : '#ABC4FF',
        width: '100%',
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
        height: "25px"
      }
      
    return (
        <div className="row d-flex flex-column justify-content-center align-items-center">
          <div className="d-flex justify-content-evenly align-items-center flex-column p-3 row">
            <button style={playStopButtonStyle} className="row col-lg-12 p-2" onClick={(target) => workingTime || relaxTime ? setPlaying(!playing) : limitAnimation(target)}>
              <div className="col-lg-12">Play / Stop</div>
              <div className="col-lg-12"><strong>{playing ? "live" : "paused"}</strong></div>
            </button>
            <div className="d-flex justify-content-evenly align-items-center col-lg-12 mt-3">
              <div style={workButtonStyle} className="d-flex justify-content-evenly align-items-center me-2 p-2" onClick={(target) => workingTime && relaxTime ? setWorkOrRelax(true) : limitAnimation(target)}>
                <img style={iconImageStyles} src={workIconImage}/>
                <p>Work</p>
              </div>
              <div style={relaxButtonStyle} className="d-flex justify-content-evenly align-items-center p-2" onClick={(target) => workingTime && relaxTime ? setWorkOrRelax(false) : limitAnimation(target)}>
                <img style={iconImageStyles} src={relaxIconImage}/>
                <p>Relax</p>
              </div>
            </div>
              <div className="text-center">
                {
                workOrRelax ? 
                  workingTime ? 
                    <span style={timerStylesLarge}>{"Work for:" + formattedWorkingMinutes + ":" + formattedWorkingSeconds}</span> : 
                    <span style={timerStylesLarge}>{"no working time left"}</span> : 
                  relaxTime ? 
                  <span style={timerStylesLarge}>{"Relax for:" + formattedRelaxMinutes + ":" + formattedRelaxSeconds}</span> : 
                  <span style={timerStylesLarge}>{"no relax time left"}</span>
                  }
              </div>
              <div className="text-center">
                {
                workOrRelax ? 
                  relaxTime ? 
                  <span style={timerStylesSmall}>{"Next: relax for" + " " + formattedRelaxMinutes + ":" + formattedRelaxSeconds}</span> : 
                  <span style={timerStylesSmall}>{"no relax time left"}</span> : 
                  workingTime ? 
                  <span style={timerStylesSmall}>{"Next: work for" + " "+ formattedWorkingMinutes + ":" + formattedWorkingSeconds}</span> : 
                  <span style={timerStylesSmall}>{"no working time left"}</span>
                }
              </div>
            </div>
            
            {/* <button onClick={(target) => workingTime && relaxTime ? setWorkOrRelax(!workOrRelax) : limitAnimation(target)}>Relax/Work</button> */}
            <div className="col-lg-12 d-flex mt-3">
              <button style={buttonStyle} onClick={(target) => workingTime >= 120 && !playing ? setWorkingTime(+workingTime - 60) : limitAnimation(target)}>delete work time</button>
              <button style={buttonStyle} onClick={(target) => workingTime < 3600 && !playing ? setWorkingTime(+workingTime + 60) : limitAnimation(target)}>add work time</button>
            </div>
            <div className="col-lg-12 d-flex mt-3">
              <button style={buttonStyle} onClick={(target) => relaxTime >= 120 && !playing ? setRelaxTime(+relaxTime - 60) : limitAnimation(target)}>delete relax time</button>
              <button style={buttonStyle} onClick={(target) => relaxTime < 1800 && !playing ? setRelaxTime(+relaxTime + 60) : limitAnimation(target)}>add relax time</button>
            </div>
            <div className="col-lg-12 d-flex mt-3">
              <button onClick={(target) => !playing ? resetTimer() : limitAnimation(target)}>reset timer</button>
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
                // height: workOrRelax ? `${workingSeconds * 2}px` : `${relaxSeconds * 2}px`,
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
        </div>
    )
}

const buttonStyle = {
  backgroundColor: 'yellow',
}

const timerStylesLarge = {
  fontSize: '25px',
  
}

const timerStylesSmall = {
  fontSize: '12.5px',
 
}

export default SideBar;