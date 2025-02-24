import { Routes, Route, Navigate, Link } from "react-router-dom";
import { Main } from "./main/Main";
import { References } from "./references/References";
import { references } from "./references/references-list";
import './Csscolors.scss';

export type Tolerance = {
    min: number;
    val: number;
};
export function CssColors() {
    return (
        <div className="app-grid cc-app__wrap">
            <h1 className="cc-app__title">CSS Colors</h1>
            <Routes>
                <Route path="/" element={
                    <>
                        <Main/>
                        <div className="cc-app__refcont">
                            <Link to={'./references'} aria-label="References for Css colors"
                                >References</Link>
                        </div>
                    </>
                }></Route>
                <Route path="/references" element={<References references={references} appname="Css Colors"/>}></Route>
                <Route path='*' element={<Navigate to='/' />} />
            </Routes>
        </div>
    );
}
