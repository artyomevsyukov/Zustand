import { nanoid } from "nanoid"
import { create, type StateCreator } from "zustand"
import { devtools } from "zustand/middleware"

export type TodoType = {
  id: string
  title: string
  isComplete: boolean
}

type TodoState = {
  todos: TodoType[]
}

type TodoAction = {
  addTodo: (value: string) => void
  changeIsComplete: (id: string) => void
  deleteTodo: (id: string) => void
}

const todoSlice: StateCreator<
  TodoState & TodoAction,
  [["zustand/devtools", never]]
> = (set, get) => ({
  todos: [],
  addTodo: (value: string) => {
    const trimmedValue = value.trim()
    if (!trimmedValue) return

    const { todos } = get()
    const newTodo: TodoType = {
      id: nanoid(),
      title: value,
      isComplete: false,
    }
    set({ todos: [...todos, newTodo] }, false, `addTodo ${value}`)
  },
  deleteTodo: (id: string) => {
    const { todos } = get()
    const newTodos = todos.filter((todo) => todo.id !== id)

    set({ todos: newTodos })
  },
  changeIsComplete: (id: string) => {
    const { todos } = get()

    const newTodos: TodoType[] = todos.map((todo) =>
      todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
    )

    const changedTodo = todos.find((todo) => todo.id === id)
    console.log("changedTodo: ", changedTodo)

    set(
      { todos: newTodos },
      false,
      changedTodo
        ? `ChangeIsComplete ${changedTodo.title} to ${!changedTodo.isComplete}`
        : "ChangeIsComplete"
    )
  },
})

export const useTodoStore = create<TodoState & TodoAction>()(
  devtools(todoSlice)
)
