import { create, type StateCreator } from "zustand"

type CounterState = {
  counter: number
}

type CounterAction = {
  increment: () => void
  decrement: () => void
  changeByAmount: (value: number) => void
}

const counterSlice: StateCreator<CounterState & CounterAction> = (
  set,
  get
) => ({
  counter: 0,
  increment: () => {
    const { counter } = get()
    set((state) => ({ ...state, counter: counter + 1 }))
  },
  decrement: () => {
    const { counter } = get()
    set((state) => ({ ...state, counter: counter - 1 }))
  },
  changeByAmount: (value: number) => {
    const { counter } = get()
    set({ counter: counter + value })
  },
})

export const useCounterStore = create<CounterState & CounterAction>(
  counterSlice
)

export const changeByAmount = (value: number) =>
  useCounterStore.getState().changeByAmount(value)
export const getCounter = () => useCounterStore.getState().counter
