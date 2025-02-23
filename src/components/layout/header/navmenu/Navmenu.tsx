import { FormEvent, useEffect, useState } from 'react';
import './Navmenu.scss';
import { useLocation, useNavigate } from 'react-router-dom';

export function Navmenu() {
    const navigate = useNavigate();
    const location = useLocation();
    const [route, setRoute] = useState<string>();
    useEffect(()=>{
        setRoute(location.pathname.split('/')[1]);
        return () => {

        }
    }, [location])

    function handleSelect(e:FormEvent) {
        navigate(`/${ (e.currentTarget as HTMLInputElement).value }`);
    }

    return (
        <label className='app-navmenu__wrap'>
            <select name="navmenu" id="navmenu" value={route} onChange={handleSelect}>
                <option value="home" defaultValue={'true'}>Home</option>
                <option value="colorguesser">Color Guesser</option>
                <option value="csscolors">CSS Colours</option>
                <option value="contrastchecker">Contrast Checker</option>
            </select>
        </label>
    )
}