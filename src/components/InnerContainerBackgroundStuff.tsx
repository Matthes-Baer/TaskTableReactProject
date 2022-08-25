import { useSelector } from "react-redux"
import { RootState } from "../app/store"

export default function InnerContainerBackgroundStuff() {
    const darkmode = useSelector((state: RootState) => state.colorTheme.value);

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
                zIndex: 0
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
                zIndex: 0
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
                }}>
            </div>
        </div>
    )
}