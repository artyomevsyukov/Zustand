import { Button, Card, Checkbox, Input, type InputRef } from "antd"
import "./App.css"
import { useTodoStore } from "./model/todoStore"
import { useState, useRef, useEffect } from "react"

function App() {
  const { todos, addTodo, changeIsComplete, deleteTodo } = useTodoStore()
  const [inputValue, setInputValue] = useState<string>("")
  const inputRef = useRef<InputRef>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus({
        cursor: "start",
      })
    }
  }, [])
  const handleAddTodo = () => {
    if (!inputValue.trim()) return
    addTodo(inputValue)
    setInputValue("")

    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div className="wrapper">
      <div style={{ display: "flex", gap: "15px" }}>
        <Input
          ref={inputRef}
          style={{ width: 300 }}
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTodo()
            }
          }}
          placeholder="Введите заголовок и нажмите Enter"
        />
        <Button onClick={handleAddTodo}>Add todo</Button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: "15px" }}>
            <Card className="card">
              <Checkbox
                checked={todo.isComplete}
                onChange={() => changeIsComplete(todo.id)}
              />
              <div>{todo.title}</div>
              <Button onClick={() => deleteTodo(todo.id)}>Delete</Button>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
