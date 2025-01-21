import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
import './App.scss'
import { ReleaseNotes } from './components/layout/releasenotes/Releasenotes'
import { Header } from './components/layout/header/Header'
import { Footer } from './components/layout/footer/Footer'
import { CssColors } from './components/apps/css-colors/Csscolors'
import { ColorGuesser } from './components/apps/color-guesser/Colorguesser'

function App() {

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header/>
        <main className="app-wrap" id="main">
            <Routes>
              <Route path='/csscolors/*' element={<CssColors/>}></Route>
              <Route path='/colorguesser/*' element={<ColorGuesser/>}></Route>
              <Route path='/releasenotes/*' element={<ReleaseNotes/>}></Route>
              <Route path='*' element={<Navigate to='/colorguesser' />} />
            </Routes>
        </main>
        <Footer/>
      </div>
    </BrowserRouter>
  )
}

export default App
