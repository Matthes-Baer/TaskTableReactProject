import * as React from "react";

// Für Animationen
import { gsap } from "gsap";

// React Router
import { Link, Outlet, NavLink } from "react-router-dom";



const Navbar = (): JSX.Element => {
    return (
        <div>
            {/* <div className="d-flex justify-content-end navbarMainContainer" >
                <NavLink onMouseEnter={someThingTest} onMouseLeave={someThingTest2} to="/" className={({ isActive }) => isActive ? "active" : "undefined"} style={{position: 'relative'}}>
                    Home
                <span style={{ backgroundColor: "white", height: "1px", width: "0px", position: 'absolute', bottom: '0', left: '0' }}></span>
                </NavLink>

                <NavLink onMouseEnter={someThingTest} onMouseLeave={someThingTest2} to="/" className={({ isActive }) => isActive ? "active" : "undefined"} style={{position: 'relative'}}>
                    Home
                <span style={{ backgroundColor: "white", height: "1px", width: "0px", position: 'absolute', bottom: '0', left: '0' }}></span>
                </NavLink>
            </div> */}
            <Outlet />
        </div>
    )
}

export default Navbar;