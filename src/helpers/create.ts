import { type StateCreator } from "zustand"
import { create as _create } from "zustand"

const resetStoreFnSet = new Set<() => void>()
export const resetAllStore = () => {
  resetStoreFnSet.forEach((resetFn) => {
    resetFn()
  })
}

export const create = (<T>() => {
  return (stateCreator: StateCreator<T>) => {
    const store = _create(stateCreator)
    const initialState = store.getState()
    const resetStore = () => {
      store.setState(initialState, true)
    }
    resetStoreFnSet.add(resetStore)
    return store
  }
}) as typeof _create
