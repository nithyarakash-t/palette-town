import { Link, Navigate, Route, Routes } from 'react-router-dom';
import './Colorguesser.scss';
import { Main } from './main/Main';
import { References } from '../css-colors/references/References';
import { references } from './references/references';

export function ColorGuesser() {
    return(
        <section className='app-grid'>
            <h1 className='cg-app__title'>Color Guesser</h1>
            <Routes>
                <Route path="/" element={
                    <>
                        <Main/>
                        <div className='cg-app__refcont'>
                            <Link to={'./references'} aria-label="References for Css colors"
                                >References</Link>
                        </div>
                    </>
                }></Route>
                <Route path="/references" element={<References references={references} appname="Color Guesser" />}></Route>
                <Route path='*' element={<Navigate to='/' />} />
            </Routes>
        </section>
    )
}