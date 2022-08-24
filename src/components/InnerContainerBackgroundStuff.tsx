export default function InnerContainerBackgroundStuff() {


    return (    
        <div className="position-absolute" style={{top: 0, left: 0}}>
            <div style={{
                width: 'inherit', 
                height: '100px', 
                backgroundColor: 'green', 
                position: 'absolute', 
                top: 600, 
                right: 0,
                zIndex: 0,
                }}>
            </div>
            <div style={{
                clipPath: 'polygon(100% 0%, 50% 100%, 0% 0%)',
                transform: 'rotate(90deg)',
                width: '100px', 
                height: '100px', 
                backgroundColor: 'green', 
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
                backgroundColor: 'green', 
                position: 'absolute', 
                top: 500, 
                left: 0,
                zIndex: 0
                }}>
            </div>
            <div style={{
                clipPath: 'polygon(100% 0%, 50% 100%, 0% 0%)',
                transform: 'rotate(90deg)',
                width: '250px', 
                height: '250px', 
                backgroundColor: 'green', 
                position: 'absolute', 
                top: 1000, 
                right: 0,
                zIndex: 0
                }}>
            </div>
        </div>
    )
}