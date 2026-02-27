import { useState, useRef } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState('')
  const inputRef = useRef(null)

  const addTask = () => {
    if (input.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: input, completed: false }])
      setInput('')
      inputRef.current?.focus()
    }
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
    inputRef.current?.focus()
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
    inputRef.current?.focus()
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask()
    }
  }

  const handlePageClick = () => {
    setTimeout(() => {
      inputRef.current?.focus()
    }, 1000)
  }

  return (
    <div className="app" onClick={handlePageClick}>
      <div className="container">
        <header className="header">
          <h1>My Tasks</h1>
          <p className="subtitle">Stop dreaming, start executing...</p>
        </header>

        <div className="input-section">
          <input
            ref={inputRef}
            autoFocus
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task..."
            className="input"
          />
          <button onClick={addTask} className="btn-add">
            <span>+</span> Add
          </button>
        </div>

        <div className="tasks-section">
          {tasks.length === 0 ? (
            <div className="empty-state">
              <p>No tasks yet. Add one to get started!</p>
            </div>
          ) : (
            <ul className="task-list">
              {tasks.map(task => (
                <li key={task.id} className="task-item">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="task-checkbox"
                  />
                  <span className={`task-text ${task.completed ? 'completed' : ''}`}>
                    {task.text}
                  </span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="btn-delete"
                    aria-label="Delete task"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className="footer">
          <p>{tasks.filter(t => !t.completed).length} active · {tasks.filter(t => t.completed).length} completed</p>
        </footer>
      </div>
    </div>
  )
}

export default App
