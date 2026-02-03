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
    <div className="min-h-screen flex flex-col items-center ">
      <h1 className="text-8xl m-8 ">
        TO-DO LIST
      </h1>

      <div className="flex w-full m-4">
        <input 
          type="text"
          className="border border-black w-7/8 mx-8 p-2"
          value={text}
          onChange={(e)=>setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="enter a task..."
        />
        <button onClick={addTodo} className="w-1/8 bg-black text-white mr-8">
          ADD
        </button>
      </div>

      <br></br>

      <div className="flex flex-row w-full justify-center  gap-10">

        <button onClick={() => setFilter("ALL")} className="px-4 py-2 rounded-md bg-black text-white hover:outline-purple-500 outline-2">
          ALL
        </button>

        <button onClick={() => setFilter("ACTIVE")} className="px-4 py-2 rounded-md bg-black text-white hover:outline-purple-500 outline-2">
          ACTIVE
        </button>

        <button onClick={() => setFilter("COMPLETED")} className="px-4 py-2 rounded-md bg-black text-white hover:outline-purple-500 outline-2">
          COMPLETED
        </button>

        <button onClick={clearCompleted} className="px-4 py-2 rounded-md bg-black text-white hover:outline-purple-500 outline-2">
          CLEAR COMPLETED
        </button>

      </div>

      <div>
        
        {filteredTodo.map((item)=>(

          <div key={item.id} className="flex items-center justify-between max-w-xl p-4 mt-4 border-2 border-purple-500 rounded-lg bg-white shadow-sm w-300">

            <div className={`text-lg transition-all duration-300  ${
              item.status ? "line-through text-gray-400 opacity-60" : "text-gray-800"
            }`}>
              {item.title}
            </div>

            <div className="flex gap-4" >
            <button onClick={() => doneTask(item.id)} disabled={item.status} className="text-green-600 font-semibold hover:text-green-700 disabled:text-gray-300 transition-colors">
              DONE
            </button>
            <button onClick={() => deleteTask(item.id)} className="text-green-600 font-semibold hover:text-green-700 disabled:text-gray-300 transition-colors">
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
