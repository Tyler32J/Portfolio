import './App.css'
import NavBar from './NavBar'
import Hero from './Hero'
import Stats from './Stats'
// import SeeMoreButton from './SeeMoreButton'
import Skills from './Skills'
import Certifications from './Certifications'
import Projects from './Projects'
import Contact from './Contact'
import Footer from './Footer'

function App() {
  return (
    <div>
      <NavBar/>
      <Hero/>
      <Stats/>
      {/* <SeeMoreButton/> */}
      <Skills/>
      <Certifications/>
      <Projects/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default App

