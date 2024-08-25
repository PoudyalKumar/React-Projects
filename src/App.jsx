import { useState } from 'react'
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
