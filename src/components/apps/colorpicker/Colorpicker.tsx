import { Link, Navigate, Route, Routes } from 'react-router-dom';
import './Colorpicker.scss';
import { Main } from './main/Main';
import { References } from '../css-colors/references/References';
import { references } from './references/references';

export function Colorpicker() {
    return (
        <section className='app-grid cop-app__wrap'>
            <h1 className='cop-app__title' aria-label='Color Picker and Converter'>Color Picker / <br/>
                <span>Converter</span>
            </h1>
            <Routes>
                <Route path="/" element={
                    <>
                        <Main/>
                        <div className='cop-app__refcont'>
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