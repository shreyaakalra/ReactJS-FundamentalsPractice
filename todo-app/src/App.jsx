import './App.css'
import { useState } from "react"

function App() {

  const [todo, setTodo] = useState([]);
  const [text, setText] = useState("")
  // const [status, setStatus] = useState(false)

  const addTodo = () => {
    setTodo([
      ...todo,
      {
        id: Date.now(),
        title: text,
        status: false
      }
    ])

    setText("");
  }

  const handleKeyDown = (e) => {
    if(e.key==="Enter") addTodo();
  }

  const doneTask = (id) => {
    const updatedTodos = todo.map((item) => {
      if(item.id === id) {
        return{...item, status: !item.status};
      }
      return item;
    });

    setTodo(updatedTodos);
  }

  
  return (
    <div>
      <h1>TO-DO LIST</h1>
      <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
      <input 
        type="text"
        style={{width: 600}}
        value={text}
        onChange={(e)=>setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="enter a task..."
      />
      <button onClick={addTodo}>
        ADD
      </button>
      </div>
      <br></br>
      <div>
        {todo.map((item)=>(
          <div key={item.id} style={{display: "flex", alignItems: "center", justifyContent: "space-between", }}>
          <div style={{textDecoration: item.status ? "line-through" : "none"}}>
            {item.title}
          </div>
          <button onClick={() => doneTask(item.id)} disabled={item.status}>
            done
          </button>
          </div>
        ))}
        <br></br>
      </div>
    </div>
  )
}

export default App
