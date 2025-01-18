import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
import './App.scss'
import { ReleaseNotes } from './layout/releasenotes/Releasenotes'
import { Header } from './layout/header/Header'
import { Footer } from './layout/footer/Footer'
import { CssColors } from './css-colors/Csscolors'

function App() {

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header/>
        <main className="app-wrap" id="main">
            <Routes>
              <Route path='/csscolors/*' element={<CssColors/>}></Route>
              <Route path='/releasenotes/*' element={<ReleaseNotes/>}></Route>
              <Route path='*' element={<Navigate to='/csscolors' />} />
            </Routes>
        </main>
        <Footer/>
      </div>
    </BrowserRouter>
  )
}

export default App
