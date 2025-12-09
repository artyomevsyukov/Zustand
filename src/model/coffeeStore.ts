import axios from "axios"
import type {
  CoffeeActions,
  CoffeeState,
  CoffeeType,
  getCoffeeListReqParams,
} from "../types/coffeeTypes"
import { create, type StateCreator } from "zustand"
import { devtools } from "zustand/middleware"

const BASE_URL = "https://purpleschool.ru/coffee-api"

const coffeeSlice: StateCreator<
  CoffeeState & CoffeeActions,
  [["zustand/devtools", never]]
> = (set) => ({
  coffeeList: undefined,

  getCoffeeList: async (params?: getCoffeeListReqParams) => {
    try {
      const { data } = await axios.get<CoffeeType[]>(BASE_URL, { params })
      set({ coffeeList: data })
    } catch (error) {
      console.log(error)
    }
  },
})

export const useCoffeeStore = create<CoffeeState & CoffeeActions>()(
  devtools(coffeeSlice)
)
