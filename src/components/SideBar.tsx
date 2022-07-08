import React, { useEffect, useState } from "react";
import { gsap } from "gsap";

const SideBar = (): JSX.Element => {
    const [workingTime, setWorkingTime] = useState<number|boolean>(10);
    const [relaxTime, setRelaxTime] = useState<number|boolean>(10);
    const [workOrRelax, setWorkOrRelax] = useState<boolean>(true)
    const [playing, setPlaying] = useState<boolean>(false);

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

      const limitAnimation = ({ currentTarget }: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        let targetTimeline = gsap.timeline({});
        targetTimeline.to(currentTarget, { duration: 0.5, backgroundColor: 'red' });
        targetTimeline.to(currentTarget, { duration: 0.5, backgroundColor: 'yellow' });
      }
      
    return (
        <div className="row d-flex flex-column justify-content-center align-items-center">
            <div>
              {
              workOrRelax ? 
                workingTime ? 
                  "Work for:" + formattedWorkingMinutes + ":" + formattedWorkingSeconds : 
                  "no working Time left" : 
                relaxTime ? 
                  "Relax for:" + formattedRelaxMinutes + ":" + formattedRelaxSeconds : 
                  'no relax Time left'
                }
            </div>
            <div>
              {
              workOrRelax ? 
                relaxTime ? 
                  "Relax for:" + formattedRelaxMinutes + ":" + formattedRelaxSeconds : 
                  "no relax Time left" : 
                workingTime ? 
                  "Work for:" + formattedWorkingMinutes + ":" + formattedWorkingSeconds : 
                  'no working Time left'
              }
            </div>
            <div>{playing.toString()}</div>
            <button onClick={() => setPlaying(!playing)}>Play/Stop</button>
            <button onClick={(target) => workingTime && relaxTime ? setWorkOrRelax(!workOrRelax) : limitAnimation(target)}>Relax/Work</button>
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
                height: '300px',
                backgroundColor: 'green',
                transition: 'all 0.5s',
                width: '25px',
                position: 'relative',
                }}
              >
              <div style={{
                height: workOrRelax ? `${workingSeconds * 5}px` : `${relaxSeconds * 5}px`,
                backgroundColor: 'red',
                transition: 'all 0.5s',
                width: '25px',
                position: 'absolute',
                top: '0',
                left: '0'
                }}
              >
              </div>
            </div>
        </div>
    )
}

const buttonStyle = {
  backgroundColor: 'yellow',
}

export default SideBar;