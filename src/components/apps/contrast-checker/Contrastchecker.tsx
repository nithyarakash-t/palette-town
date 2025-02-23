import { Link, Navigate, Route, Routes } from 'react-router-dom';
import './Contrastchecker.scss';
import { Main } from './main/Main';
import { References } from '../css-colors/references/References';
import { references } from './references/references';
import { Faq } from './faq/Faq';

export function ContrastChecker() {
    return(
        <section className='app-grid'>
            <h1 className='cxc-app__title'>Contrast checker</h1>
            <Routes>
                <Route path="/" element={
                    <>
                        <Main/>
                        <Faq />
                        <div className='cxc-app__refcont'>
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