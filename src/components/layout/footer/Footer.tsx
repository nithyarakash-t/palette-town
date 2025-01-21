import { releaseNotes } from '../releasenotes/release-notes';
import './Footer.scss';
import { Link } from 'react-router-dom';

export function Footer() {
    return (
        <footer className='app-footer__wrap app-grid'>
            <div className='app-footer__inner'>
                <a href='https://github.com/Nithyarakash-t/palette-town' target='_blank' title='View the Project on Github'>Project on Github</a>
                <div className='app-footer__right'>
                    <Link to={'/releasenotes'} aria-label='Release Notes'>Release Notes</Link>
                    <p>v{releaseNotes[0].version}</p>
                </div>
            </div>
        </footer>
    )
}