import { type StateCreator } from "zustand"
import { persist } from "zustand/middleware"
import { create } from "../helpers/create"

type CounterState = {
  counter: number
  persistentCounter: number
}

type CounterAction = {
  increment: () => void
  decrement: () => void
  changeByAmount: (value: number) => void
  resetStore: () => void
}

const initialState: CounterState = {
  counter: 0,
  persistentCounter: 0,
}

const counterSlice: StateCreator<
  CounterState & CounterAction,
  [["zustand/persist", unknown]]
> = (set, get) => ({
  ...initialState,

  resetStore: () => {
    set(initialState)
  },
  increment: () => {
    const { counter, persistentCounter } = get()
    set((state) => ({
      ...state,
      counter: counter + 1,
      persistentCounter: persistentCounter + 1,
    }))
  },
  decrement: () => {
    const { counter, persistentCounter } = get()
    set((state) => ({
      ...state,
      counter: counter - 1,
      persistentCounter: persistentCounter - 1,
    }))
  },
  changeByAmount: (value: number) => {
    const { counter } = get()
    set({ counter: counter + value })
  },
})

export const useCounterStore = create<CounterState & CounterAction>()(
  persist(counterSlice, {
    name: "CounterStore",
    partialize: (state) => ({ persistentCounter: state.persistentCounter }),
  })
)

export const changeByAmount = (value: number) =>
  useCounterStore.getState().changeByAmount(value)
export const getCounter = () => useCounterStore.getState().counter
