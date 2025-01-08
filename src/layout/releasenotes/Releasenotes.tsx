import { Link } from 'react-router-dom';
import './Releasenotes.scss';

export function ReleaseNotes() {
    return (
        <section className="app-releasenotes__wrap" aria-labelledby="app_releasenotes_title">
            <div className="app-container">
                <div className='app-releasenotes__head'>
                    {/* Test autofocus - may not work */}
                    <Link autoFocus to={'/'} className='app-releasenotes__back' aria-label="Back to home">
                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 1024 1024"><path fill="currentColor" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"/><path fill="currentColor" d="m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"/></svg>
                    </Link>
                    <h2 className="app-releasenotes__title">Release Notes</h2>
                </div>
                <ol className="app-releasenotes__list">
                    <li>
                        <div className="app-releasenotes__group" role="group" aria-labelledby="releasenote_v_1.1">
                            <h3 id='releasenote_v_0.0'>Version 0.0 - (date)</h3>
                            <ul>
                                <li>MVP deployed</li>
                            </ul>
                        </div>
                    </li>
                </ol>
            </div>
        </section>
    )
}