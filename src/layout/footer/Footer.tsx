import './Footer.scss';
import { Link } from 'react-router-dom';

export function Footer() {
    return (
        <footer className='app-footer__wrap app-grid'>
            <div className='app-footer__inner'>
                <a href='https://github.com/Nithyarakash-t/URLifySVG' target='_blank' title='View the Project on Github'>Project on Github</a>
                <div className='app-footer__right'>
                    <Link to={'/releasenotes'} aria-label='Release Notes'>Release Notes</Link>
                    <p>v0.0.0</p>
                </div>
            </div>
        </footer>
    )
}