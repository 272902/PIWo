import { NavLink } from "react-router";

export default () => {
    return (
        <nav>
            <NavLink to="/">Strona Główna</NavLink>
            <NavLink to="/new">Dodaj Książkę</NavLink>
            <NavLink to="/login">Zaloguj Się</NavLink>
        </nav>
    );
};