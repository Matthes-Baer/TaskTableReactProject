import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import landscape from '../images/landscape.jpg';
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useState } from "react";

const ErrorPage = () => {
    const darkmode = useSelector((state: RootState) => state.colorTheme.value);
    const [gsapButtonState, setGsapButtonState] = useState<boolean>(false)

    const mainContainer = {
        backgroundColor: darkmode ? '#001233' : '#EDF2FB',
        minHeight: '150vh',
        backgroundImage: `url(${landscape})`,
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundPosition: darkmode ? 'top' : 'bottom',
        transition: '.5s',
    };

    const gsapButtonHoverAnimation: (input:  React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void = ({target}:  React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (!gsapButtonState) {
            gsap.to(target, { backgroundColor: 'rgba(255, 255, 255, 0.25)', duration: 1 });
            setGsapButtonState(previous => !previous);
        } else {
            gsap.to(target, { backgroundColor: 'rgba(0, 0, 0, 0.25)', duration: 1 });
            setGsapButtonState(previous => !previous);
        }
    }
    
    return (
        <div className="text-center" style={mainContainer}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Task Tour React Portfolio Project</title>
                <meta name="description" content="A React Project for my portfolio"/>
            </Helmet>
            <h1 style={{color: 'white'}} className="mb-4">404 - Error Page</h1>
            <Link to="/" style={{
                textDecoration: 'none', 
                color: 'white', 
                fontSize: '50px', 
                backgroundColor: 'rgba(0, 0, 0, 0.25)', 
                border: '1px solid black', 
                padding: '15px'
                }}
                onMouseEnter={(target) => gsapButtonHoverAnimation(target)}
                onMouseLeave={(target) => gsapButtonHoverAnimation(target)}
                >
                Back home
            </Link>
        </div>
    )
}

export default ErrorPage;