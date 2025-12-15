import { type StateCreator } from "zustand"
import { createJSONStorage, devtools, persist } from "zustand/middleware"
import { getCoffeeList } from "./coffeeStore"
import { hashStorage } from "../helpers/hashStore"
import { create } from "../helpers/create"
import { debounce } from "../utils/debounce"

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
  [["zustand/devtools", never], ["zustand/persist", unknown]]
> = (set) => ({
  ...initialState,
  setText: (text) => set({ text }),
})

export const useSearchStore = create<SearchState & SearchAction>()(
  devtools(
    persist(searchSlice, {
      name: "searchStore",
      storage: createJSONStorage(() => hashStorage),
    }),
    {
      name: "searchStore",
    }
  )
)

const debouncedSearch = debounce((text: string) => {
  getCoffeeList({
    text: text.trim() === "" ? undefined : text,
  })
}, 500)

useSearchStore.subscribe((state, prevState) => {
  if (state.text !== prevState.text) {
    debouncedSearch(state.text)
  }
})
