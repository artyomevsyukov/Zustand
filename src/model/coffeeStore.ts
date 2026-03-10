import type { CoffeeType, getCoffeeListReqParams } from "../types/storeTypes"
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

export const setParams = (params?: getCoffeeListReqParams) =>
  useCoffeeStore.getState().setParams(params)

export const clearParams = () =>
  useCoffeeStore.getState().setParams({ text: undefined })

// export const getCoffeeListData = () => useCoffeeStore.getState().coffeeList

// export const getCurrentParams = () => useCoffeeStore.getState().params

export const setAddress = (address: string) =>
  useCoffeeStore.getState().setAddress(address)

export const orderCoffee = () => useCoffeeStore.getState().orderCoffee()

export const clearCart = () => useCoffeeStore.getState().clearCart()

export const addToCart = (coffee: CoffeeType) =>
  useCoffeeStore.getState().addToCart(coffee)
