import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import ClockHeading from './components/ClockHeading'
import CurrentTime from './components/CurrentTime'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="clock-block">
      <div className="container">
        <ClockHeading />
        <CurrentTime />
      </div>
    </div>
      
    </>
  )
}

export default App
