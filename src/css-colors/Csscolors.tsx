import { Routes, Route, Navigate, Link } from "react-router-dom";
import { Main } from "./main/Main";
import { References } from "./references/References";
export type Tolerance = {
    min: number;
    val: number;
};
export function CssColors() {
    return (
        <div className="app-grid">
            <h1 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>CSS Colors</h1>
            <Routes>
                <Route path="/" element={
                    <>
                        <Main/>
                        <div style={{ margin: '1rem 0 3rem 0', display: 'flex', justifyContent: 'center' }}>
                            <Link to={'./references'} aria-label="References for Css colors"
                                >References</Link>
                        </div>
                    </>
                }></Route>
                <Route path="/references" element={<References />}></Route>
                <Route path='*' element={<Navigate to='/' />} />
            </Routes>
        </div>
    );
}
