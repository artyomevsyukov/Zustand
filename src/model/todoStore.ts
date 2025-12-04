import { create, type StateCreator } from "zustand"
import { devtools } from "zustand/middleware"

export type TodoType = {
  title: string
  isComplete: boolean
}

type TodoState = {
  todos: TodoType[]
}

type TodoAction = {
  addTodo: (value: string) => void
  changeIsComplete: (index: number) => void
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

    set(
      { todos: [...todos, { title: value, isComplete: false }] },
      false,
      `addTodo ${value}`
    )
  },
  changeIsComplete: (index: number) => {
    const { todos } = get()
    if (index < 0 || index >= todos.length) return

    const newTodos: TodoType[] = [
      ...todos.slice(0, index),
      { ...todos[index], isComplete: !todos[index].isComplete },
      ...todos.slice(index + 1),
    ]
    set(
      { todos: newTodos },
      false,
      `ChangeIsComplete ${todos[index].title} to ${newTodos[index].isComplete}`
    )
  },
})

export const useTodoStore = create<TodoState & TodoAction>()(
  devtools(todoSlice)
)
