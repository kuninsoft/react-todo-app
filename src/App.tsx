import { useState } from "react"; 
import "./ListItem.ts"
import './App.scss'
import ListItem from "./ListItem.ts";
import TodoList from "./TodoList.tsx";
import { TodoItemsContext } from "./context.ts";

function App() {
  const [todoItems, setTodoItems] = useState<ListItem[]>([]);
  const [newItem, setNewItem] = useState("");

  const handleAdd = () => { 
    if (!newItem) {
      return;
    }

    setTodoItems((prev) => [new ListItem(newItem), ...prev]);

    setNewItem("");
  }

  return (
    <TodoItemsContext.Provider value={{todoItems, setTodoItems}}>
      <h1>To-Do List</h1>

      <hr/>

      <div id="input-container">
        <input type="text"
               id="todo-input" 
               placeholder="Enter a todo item..."
               value={newItem}
               onChange={(e) => setNewItem(e.target.value)} />
        <button id="add-btn" onClick={handleAdd}>Add</button>
      </div>

      <hr/>
      
      { todoItems.length ?
        <TodoList />
      : <span id="empty-text">The list is empty</span>
      }
    </TodoItemsContext.Provider>
  )
}

export default App
