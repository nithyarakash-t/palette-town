import { Link } from "react-router-dom";
import { Themeswitch } from "../themeSwitch/Themeswitch";
import './Header.scss';

export function Header() {
    return (
        <header className="app-header__wrap app-grid">
            <div className="app-header__inner">
                <Link to={'/'} className="app-header__logo">
                    Palette Town
                </Link>
                <Themeswitch/>
            </div>
        </header>
    )
}