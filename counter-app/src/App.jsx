import './App.css'
import { useState } from "react"

function App() {

  const[count, setCount] = useState(0);

  function incrementClick(){
    setCount(count+1);
  }

  function decrementClick(){
    setCount(count-1);
  }

  function resetClick(){
    setCount(0);
  }

  return (
    <>
      <h1>COUNTER APP</h1>
      <p>counter : {count}</p>
      <div>
        <button onClick={incrementClick}>
          INCREMENT
        </button>
        <button onClick={decrementClick}>
          DECREMENT
        </button>
        <button onClick={resetClick}>
          RESET
        </button>
      </div>
        
    </>
  )
}

export default App
