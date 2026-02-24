import type { getCoffeeListReqParams } from "../types/storeTypes"
import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import type {
  CartAction,
  CartState,
  ListActions,
  ListState,
} from "../types/storeTypes"
import { listSlice } from "./listSlice"
import { cartSlice } from "./cartSlice"

export const useCoffeeStore = create<
  CartState & CartAction & ListActions & ListState
>()(
  devtools(
    persist((...arg) => ({ ...listSlice(...arg), ...cartSlice(...arg) }), {
      name: "coffeeStore",
      partialize: (state) => ({ cart: state.cart, address: state.address }),
    }),
    { name: "coffeeStore" },
  ),
)

export const getCoffeeList = (params?: getCoffeeListReqParams) =>
  useCoffeeStore.getState().getCoffeeList(params)
