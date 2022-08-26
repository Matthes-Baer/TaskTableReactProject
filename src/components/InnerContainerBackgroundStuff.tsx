import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import { useSelector } from "react-redux"
import { RootState } from "../app/store"

export default function InnerContainerBackgroundStuff() {
    const darkmode = useSelector((state: RootState) => state.colorTheme.value);
    const movingRectangleRef1 = useRef(null);
    const movingRectangleRef2 = useRef(null);
    
    useLayoutEffect(() => {
        var movingRectangleRef1Timeline = gsap.timeline({ repeat: 0 });
        movingRectangleRef1Timeline.to(movingRectangleRef1.current, { x: 0, y: 0, rotate: 30, duration: 25 });
        movingRectangleRef1Timeline.to(movingRectangleRef1.current, { x: 30, y: 35, rotate: 25, duration: 25 });
        movingRectangleRef1Timeline.to(movingRectangleRef1.current, { x: 70, y: 35, rotate: 35, duration: 25 });
        movingRectangleRef1Timeline.to(movingRectangleRef1.current, { x: 25, y: 15, rotate: 75, duration: 25 });
        movingRectangleRef1Timeline.to(movingRectangleRef1.current, { x: 35, y: 25, rotate: 45, rotateZ: 15, duration: 25 });
        movingRectangleRef1Timeline.to(movingRectangleRef1.current, { x: 0, y: 0, rotate: 0, duration: 25 });

        const interval1 = setInterval(() => {
            if (movingRectangleRef1Timeline.reversed()) {
                movingRectangleRef1Timeline.play();
            } else {
                movingRectangleRef1Timeline.reverse();
            }
        }, 150000)

        var movingRectangleRef2Timeline = gsap.timeline({ repeat: 0 });
        movingRectangleRef2Timeline.to(movingRectangleRef2.current, { x: 0, y: 0, rotate: 30, duration: 35 });
        movingRectangleRef2Timeline.to(movingRectangleRef2.current, { x: -30, y: -35, rotate: 25, duration: 35 });
        movingRectangleRef2Timeline.to(movingRectangleRef2.current, { x: -70, y: 5, rotate: 55, duration: 35 });
        movingRectangleRef2Timeline.to(movingRectangleRef2.current, { x: 0, y: 15, rotate: 135, duration: 35 });
        movingRectangleRef2Timeline.to(movingRectangleRef2.current, { x: 20, y: 20, rotate: 45, duration: 35 });
        movingRectangleRef2Timeline.to(movingRectangleRef2.current, { x: 0, y: 0, rotate: 45, duration: 35 });

        const interval2 = setInterval(() => {
            if (movingRectangleRef2Timeline.reversed()) {
                movingRectangleRef2Timeline.play();
            } else {
                movingRectangleRef2Timeline.reverse();
            }
        }, 210000)
    }, []);

    return (    
        <div className="position-absolute" style={{top: 0, left: 0}}>
            <div style={{
                width: 'inherit', 
                height: '100px', 
                backgroundColor: 'transparent',
                borderTop: '2px solid rgb(133,44,141)',
                borderBottom: '4px solid rgb(133,44,141)',
                position: 'absolute', 
                top: 575, 
                right: 0,
                zIndex: 0,
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
                }}>
            </div>
            <div style={{
                width: 'inherit', 
                height: '75px', 
                backgroundColor: 'transparent',
                borderTop: '3px solid #EC214E',
                borderBottom: '2px solid #EC214E',
                position: 'absolute',
                opacity: 0.5,
                top: 775, 
                right: 0,
                zIndex: 0,
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
                }}>
            </div>
            <div style={{
                width: 'inherit', 
                height: '150px', 
                backgroundColor: 'transparent',
                borderTop: '5px solid #EC214E',
                borderBottom: '2px solid #EC214E',
                opacity: 0.55,
                position: 'absolute', 
                top: 1200, 
                right: 0,
                zIndex: 0,
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
                }}>
            </div>
            <div style={{
                clipPath: 'polygon(100% 0%, 50% 100%, 0% 0%)',
                transform: 'rotate(90deg)',
                width: '100px', 
                height: '100px', 
                backgroundImage: 'linear-gradient(to Bottom, rgb(133,44,141), #EC214E',
                opacity: 0.5, 
                position: 'absolute', 
                top: 250, 
                right: 0,
                zIndex: 0,
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
                }}>
            </div>
            <div style={{
                clipPath: 'polygon(100% 0%, 50% 100%, 0% 0%)',
                transform: 'rotate(270deg)',
                width: '150px', 
                height: '150px', 
                backgroundImage: 'linear-gradient(to Top, rgb(133,44,141), #EC214E',
                opacity: 0.55, 
                position: 'absolute', 
                top: 400, 
                left: 0,
                zIndex: 0,
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
                }}>
            </div>
            <div style={{
                clipPath: 'polygon(100% 0%, 50% 100%, 0% 0%)',
                transform: 'rotate(90deg)',
                width: '250px', 
                height: '250px',
                backgroundImage: 'linear-gradient(to Right, rgb(133,44,141), #EC214E',
                position: 'absolute',
                opacity: 0.9,
                top: 900, 
                right: 0,
                zIndex: 0,
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
                }}>
            </div>

            <div style={{
                width: '100px',
                height: '100px',
                backgroundColor: 'transparent',
                border: '3px solid #EC214E',
                position: 'absolute',
                top: 200,
                left: 50,
                opacity: 0.5,
                zIndex: 0,
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
            }}
            ref={movingRectangleRef1}>
            </div>

            <div style={{
                width: '200px',
                height: '75px',
                backgroundColor: 'transparent',
                border: '2px solid rgb(133,44,141)',
                position: 'absolute',
                top: 500,
                right: 100,
                opacity: 0.5,
                zIndex: 0,
                rotate: '45deg',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
            }}
            ref={movingRectangleRef2}>
            </div>
        </div>
    )
}