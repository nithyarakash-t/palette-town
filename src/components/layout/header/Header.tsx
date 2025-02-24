import { Link } from "react-router-dom";
import { Themeswitch } from "../themeSwitch/Themeswitch";
import './Header.scss';
import { NavigationMenu } from "./navigationmenu/Navigationmenu";

export function Header() {
    return (
        <header className="app-header__wrap app-grid">
            <div className="app-header__inner">
                <Link to={'/'} className="app-header__logo">
                    Palette Town
                </Link>
                <div className="app-header__right">
                    <NavigationMenu />
                    <Themeswitch/>
                </div>
            </div>
        </header>
    )
}