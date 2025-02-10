import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
import './App.scss'
import { ReleaseNotes } from './components/layout/releasenotes/Releasenotes'
import { Header } from './components/layout/header/Header'
import { Footer } from './components/layout/footer/Footer'
import { CssColors } from './components/apps/css-colors/Csscolors'
import { ColorGuesser } from './components/apps/color-guesser/Colorguesser'
import { Home } from './components/layout/home/Home'
import { ThemeContextProvider } from './components/layout/themeSwitch/Themecontext'

function App() {

  return (
    <BrowserRouter>
      <ThemeContextProvider>
        <div className="app-wrapper">
          <Header/>
          <main className="app-wrap" id="main">
              <Routes>
                {
                  ['/home'].map((item, index)=>{
                    return (
                      <Route key={index} path={item} element={<Home/>}></Route>
                    )
                  })
                }
                <Route path='/csscolors/*' element={<CssColors/>}></Route>
                <Route path='/colorguesser/*' element={<ColorGuesser/>}></Route>
                <Route path='/releasenotes/*' element={<ReleaseNotes/>}></Route>
                <Route path='*' element={<Navigate to='/home' />} />
              </Routes>
          </main>
          <Footer/>
        </div>
      </ThemeContextProvider>
    </BrowserRouter>
  )
}

export default App
