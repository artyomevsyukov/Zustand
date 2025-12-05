import axios from "axios"
import type { CoffeeType } from "../types/coffeeTypes"
import { create, type StateCreator } from "zustand"
import { devtools } from "zustand/middleware"

const BASE_URL = "https://purpleschool.ru/coffee-api"

type CoffeeState = {
  coffeeList?: CoffeeType[]
}

type CoffeeActions = {
  getCoffeeList: () => void
}

const coffeeSlice: StateCreator<
  CoffeeState & CoffeeActions,
  [["zustand/devtools", never]]
> = (set) => ({
  coffeeList: undefined,

  getCoffeeList: async () => {
    try {
      const { data } = await axios.get<CoffeeType[]>(BASE_URL)
      set({ coffeeList: data })
    } catch (error) {
      console.log(error)
    }
  },
})

export const useCoffeeStore = create<CoffeeState & CoffeeActions>()(
  devtools(coffeeSlice)
)
