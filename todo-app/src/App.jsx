import './App.css'
import { useState } from "react"

function App() {

  const [todo, setTodo] = useState([]);
  const [text, setText] = useState("")

  const addTodo = () => {
    setTodo([
      ...todo,
      {
        id: Date.now(),
        title: text,
        status: false
      }
    ])

    setTodo("");
  }
  
  return (
    <div>
      <h1>TO-DO LIST</h1>
      <input 
        type="text"
        style={{width: 600}}
        value={text}
        onChange={(e)=>setText(e.target.value)}
        placeholder="enter a task..."
      />
      <button onClick={addTodo}>
        ADD
      </button>
      <div>
        {todo.map((item)=>(
          <div key={item.id}>
          <div>{item.title}</div>
          <button>done</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
