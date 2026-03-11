import type { StateCreator } from "zustand"
import type {
  CartAction,
  CartState,
  CoffeeType,
  getCoffeeListReqParams,
  ListActions,
  ListState,
} from "../types/storeTypes"
import axios from "axios"
import { BASE_URL } from "../api/CoreApi"

const initialState: ListState = {
  coffeeList: undefined,
  params: { text: undefined },
}

export const listSlice: StateCreator<
  CartState & CartAction & ListActions & ListState,
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  ListState & ListActions
> = (set, get) => ({
  ...initialState,
  setParams: (newParams) => {
    const { getCoffeeList, params } = get()
    const mergedParams = { ...params, ...newParams }
    set({ params: mergedParams }, false, "setParams")
    getCoffeeList(mergedParams)
  },
  getCoffeeList: async (params?: getCoffeeListReqParams) => {
    try {
      const { data } = await axios.get<CoffeeType[]>(BASE_URL, { params })
      set({ coffeeList: data })
    } catch (error) {
      console.log(error)
    }
  },
})
