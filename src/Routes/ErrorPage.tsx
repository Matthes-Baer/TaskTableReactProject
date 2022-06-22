import React, { useEffect, useRef } from "react";

import Typed from 'typed.js';

// Für Animationen;
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// images:
import ralphWaldo from '../images/ralph waldo.png';
import caveWithRocks from '../images/caveWithRocks.png';




import { useGetRandomQuoteQuery } from "../APIs/QuoteAPI";

type APIDataType =  string | null

const ErrorPage = () => { 
    gsap.registerPlugin(ScrollTrigger);
    
    const el = useRef<any>(null);
    const typed = useRef<any>(null);

    useEffect(() => {
      }, []);

    // const { data, error, isFetching } = useGetRandomQuoteQuery(null);
    // const APIdata: APIDataType = error ? 'Fehler mit der API' : isFetching ? 'Zitat wird geladen' : null

    // // für typed.js:
    // useEffect(() => {
    //     const options = {
    //         strings: [APIdata == null ? data && JSON.stringify(data.content, null, 0).replaceAll(/\\r|\\n/g, " ") : ''],
    //         typeSpeed: 10,
    //         showCursor: false,
    //     };
    //     typed.current = new Typed(el.current, options);
    //     return () => {
    //         typed.current.destroy();
    //     }
    // });

    // für gsap:
    // const gsapRefTarget = useRef(null)
    // var enterTimeline = gsap.timeline({ paused: true, repeat: -1 }) ;
    // enterTimeline.to(gsapRefTarget.current, { duration: 3, y: 100, ease: 'bounce' });
    // enterTimeline.to(gsapRefTarget.current, { duration: 3, y: 0, ease: 'back' });

    
    // function gsapHandleOnMouseEnter ({ currentTarget }: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    //    enterTimeline.paused( !enterTimeline.paused() ); 
    // }

    // function gsapHandleOnMouseLeave ({ currentTarget }: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    //     enterTimeline.paused( !enterTimeline.paused() );  
    // }
    
    return (
        <div className="errorPageMainContainer justify-content-center" >
            <div className="container d-flex flex-column" id="testing">
            <h1>404 - hier gibt es leider nichts.</h1>
            <div className="d-flex align-items-center justify-content-center">
                <div className="">Für die Zeit, bis du wieder auf dem richtigen Pfad gelangst, gibt es hier ein kurzes Zitat</div>
                
            </div>
            </div>




<div>
    <img src={ralphWaldo} className="img-fluid smallImageRelative"/>
</div>
            
            
          <div className="align-items-center item3">
          TESTING
          <div>
            {/* <div ref={gsapRefTarget} onMouseEnter={gsapHandleOnMouseEnter} onMouseLeave={gsapHandleOnMouseLeave} style={{width: "200px", height: "200px", backgroundColor:"blue"}}>

            </div> */}
                <div ref={el}></div>
            

            


            <div className="d-flex justify-content-end">
                
            
            {/* {APIdata || 
            <>  
                <div>{JSON.stringify(data.originator.name, null, 0)}</div>
                <div><a href={data.originator.url}>Link zum Urheber</a></div>
            </>
            } */}
            </div>
            
          </div>
            
           

            <div>
                
            {/* <div onMouseEnter={gsapHandleOnMouseEnter} onMouseLeave={gsapHandleOnMouseLeave} style={{width: "200px", height: '200px', backgroundColor: 'green', borderRadius: "50%"}}>
            </div> */}
            </div>
            </div>
            

        </div>
    )
}

export default ErrorPage;