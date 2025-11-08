import { useState } from "react"; 
import "./ListItem.ts"
import './App.scss'
import ListItem from "./ListItem.ts";

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

  const handleCheck = (id: number) => {
    setTodoItems((prev) => {
      return prev.map((pItem) => pItem.id !== id ? pItem : {...pItem, isDone: !pItem.isDone});
    });
  }

  const handleDelete = (id: number) => {
    setTodoItems((prev) => prev.filter(pItem => pItem.id !== id));
  }

  const handleEdit = (id: number) => {
    setTodoItems((prev) => {
      return prev.map((pItem) => {
        if (pItem.id !== id) {
          return pItem;
        }

        if (!pItem.title) {
          return pItem;
        }

        return {...pItem, isEdited: !pItem.isEdited};
      });
    })
  }
  
  const handleEditValue = (id: number, value: string) => {
    setTodoItems((prev) => {
      return prev.map((pItem) => pItem.id !== id ? pItem : {...pItem, title: value});
    })
  }

  return (
    <>
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
        <ul>
          {
            todoItems.map((item) => {
              return (
              <li key={item.id}>
                <label>
                  <input type="checkbox" 
                         checked={item.isDone} 
                         onChange={() => handleCheck(item.id)} 
                         style={{ display: item.isEdited ? "none" : "grid" }} />
                  { !item.isEdited ? 
                    <span style={{ textDecoration: item.isDone ? "line-through" : "none"}}>
                      {item.title}
                    </span>
                    : 
                    <input autoFocus type="text" value={item.title} onChange={(e) => handleEditValue(item.id, e.target.value)} />
                  }
                </label>

                <button onClick={() => handleEdit(item.id)} className={item.isEdited ? "done-btn" : ""}>{ item.isEdited ? "Done" : "Edit" }</button>
                <button className="danger" onClick={() => handleDelete(item.id)} style={{ display: item.isEdited ? "none" : "block" }}>Delete</button>
              </li>
              ); })
          }
        </ul>
        : <span id="empty-text">The list is empty</span>
        }
    </>
  )
}

export default App
