import './App.css'
import { Heading } from './components/heading.jsx'
import { Counter } from './components/counter.jsx'
import { Button } from './components/button.jsx'
import { useState } from "react"

function App() {

  const[count, setCount] = useState(0);

  function incrementClick(){
    setCount(count+1)
  }

  function decrementClick(){
    setCount(count-1)
  }

  function resetClick(){
    setCount(0)
  }


  return (
    <>
      <Heading />
      <Counter 
        count={count}
      />
      <div>
        <Button 
          title="INCREMENT"
          task={incrementClick}
        />
        <Button 
          title="DECREMENT"
          task={decrementClick}
          isOffline={count===0}
        />
        <Button 
          title="Reset"
          task={resetClick}
        />
        
      </div>
      
    </>
  )
}

export default App
