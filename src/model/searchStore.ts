import { create, type StateCreator } from "zustand"
import { devtools } from "zustand/middleware"
import { getCoffeeList } from "./coffeeStore"

type SearchState = {
  text: string
}

type SearchAction = {
  setText: (text: string) => void
}

const initialState: SearchState = {
  text: "",
}

const searchSlice: StateCreator<
  SearchState & SearchAction,
  [["zustand/devtools", never]]
  //   ["zustand/persist", unknown]]
> = (set) => ({
  ...initialState,
  setText: (text) => set({ text }),
})

export const useSearchStore = create<SearchState & SearchAction>()(
  devtools(searchSlice, { name: "searchStore" })
)

useSearchStore.subscribe((state, prevState) => {
  if (state.text !== prevState.text) {
    getCoffeeList({
      text: state.text.trim() === "" ? undefined : state.text,
    })
  }
})
