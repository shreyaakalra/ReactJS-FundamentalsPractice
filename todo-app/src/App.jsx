import './App.css'
import { useState } from "react"

function App() {

  const [todo, setTodo] = useState([]);
  const [text, setText] = useState("")
  const [filter, setFilter] = useState("ALL");

  const addTodo = () => {
    if(text==="") return;

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

  const deleteTask = (id) => {
    const remainingTodos = todo.filter((item) => {
      return item.id !== id;
    });

    setTodo(remainingTodos);
  }

  const filteredTodo = todo.filter((item) => {
    if(filter==="ACTIVE") return !item.status;
    if(filter==="COMPLETED") return item.status;
    return true;
  })

  const clearCompleted = () => {
    const clearTodo = todo.filter((item) => {
      return !item.status;
    })

    setTodo(clearTodo);
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
        <button onClick={() => setFilter("ALL")} style={{marginRight: "20px"}}>
          ALL
        </button>

        <button onClick={() => setFilter("ACTIVE")} style={{marginRight: "20px"}}>
          ACTIVE
        </button>

        <button onClick={() => setFilter("COMPLETED")} style={{marginRight: "20px"}}>
          COMPLETED
        </button>

        <button onClick={clearCompleted} style={{marginRight: "20px"}}>
          CLEAR COMPLETED
        </button>
      </div>

      <div>
        
        {filteredTodo.map((item)=>(
          <div key={item.id} style={{display: "flex", alignItems: "center", justifyContent: "space-between", }}>

            <div style={{textDecoration: item.status ? "line-through" : "none"}}>
              {item.title}
            </div>

            <div>
            <button onClick={() => doneTask(item.id)} disabled={item.status}>
              done
            </button>
            <button onClick={() => deleteTask(item.id)}>
              DELETE
            </button>
            </div>

          </div>
        ))}
        
        <br></br>
      </div>
    </div>
  )
}

export default App
