
import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { Home } from './pages/Home.jsx'
import { BugIndex } from './pages/BugIndex.jsx'
import { BugDetails } from './pages/BugDetails.jsx'
import { UserDetails } from './pages/UserDetails.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { UserIndex } from './pages/UserIndex.jsx'

export function App() {
  return (
    <Router>
      <div>
        <AppHeader />
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/bug' element={<BugIndex />} />
            <Route path='/user' element={<UserIndex />} />
            <Route path='/bug/:bugId' element={<BugDetails />} />
            <Route path='/user/:userId' element={<UserDetails />} />
            <Route path='/about' element={<AboutUs />} />
          </Routes>
        </main>
        <AppFooter />
      </div>
    </Router>
  )
}
