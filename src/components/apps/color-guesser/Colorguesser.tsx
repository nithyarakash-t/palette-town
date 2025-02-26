import { Link, Navigate, Route, Routes } from 'react-router-dom';
import './Colorguesser.scss';
import { Main } from './main/Main';
import { References } from '../css-colors/references/References';
import { references } from './references/references';

export function ColorGuesser() {
    return(
        <section className='app-grid cg-app__wrap'>
            <svg className='sr-only' xmlns="http://www.w3.org/2000/svg" width="0" height="0" ><filter id="rough-edge"><feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise"></feTurbulence><feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G"></feDisplacementMap></filter></svg>
            <h1 className='cg-app__title'>Color <span>Guesser</span></h1>
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