import {NavLink} from "react-router-dom";
import "./Header.css";
export const Header = (active)=>{
    return (
        <header>
            <NavLink to="/" className={active === "home" ? "active nav" : "nav"} >Home </NavLink>
            <NavLink to="/movies" className={active === "movies" ? "active nav" : "nav"}>Movies</NavLink>
        </header>
    )
}