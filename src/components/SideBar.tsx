import React, { useEffect, useState } from "react";

const SideBar = (): JSX.Element => {
    const [time, setTime] = useState<number>(600);
    const [playing, setPlaying] = useState<boolean>(false);
    let minutes = Math.floor(time / 60);
    let seconds = (time - minutes * 60);
    let formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    let formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

      useEffect(() => {
        const timeout = setTimeout(() => {
            if(time && playing){
                setTime(time - 1)
            }
          }, 1000);

          if (!playing) {
            clearTimeout(timeout)
          }
      }, [playing, time])
    return (
        <>
            Testing with component
            {formattedMinutes + ":" + formattedSeconds}
            {playing.toString()}
            <button onClick={() => setPlaying(!playing)}>Play/Stop</button>
        </>
    )
}

export default SideBar;