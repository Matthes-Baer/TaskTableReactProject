// React Router
import { Link, Outlet, NavLink } from "react-router-dom";



const Navbar = (): JSX.Element => {
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default Navbar;