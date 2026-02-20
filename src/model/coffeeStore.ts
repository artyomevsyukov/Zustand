import axios from "axios"
import type {
  ListActions,
  ListState,
  CoffeeType,
  getCoffeeListReqParams,
  OrderItem,
  CartState,
  CartAction,
  OrderCoffeeRes,
} from "../types/storeTypes"
import { create, type StateCreator } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { BASE_URL } from "../api/CoreApi"

const initialState: ListState & CartState = {
  coffeeList: undefined,
  cart: [],
  address: "",
  params: { text: undefined },
}

const coffeeSlice: StateCreator<
  ListState & ListActions & CartState & CartAction,
  [["zustand/devtools", never], ["zustand/persist", unknown]]
> = (set, get) => ({
  ...initialState,

  setParams: (newParams) => {
    const { getCoffeeList, params } = get()
    set({ params: { ...params, ...newParams } }, false, "setParams")
    getCoffeeList(params)
  },
  getCoffeeList: async (params?: getCoffeeListReqParams) => {
    try {
      const { data } = await axios.get<CoffeeType[]>(BASE_URL, { params })
      set({ coffeeList: data })
    } catch (error) {
      console.log(error)
    }
  },
  orderCoffee: async () => {
    const { cart, address, clearCart } = get()
    try {
      const { data } = await axios.post<OrderCoffeeRes>(`${BASE_URL}/order`, {
        address,
        orderItems: cart,
      })
      if (data.success) {
        alert(data.message)
        clearCart()
      }
    } catch (error) {
      console.log(error)
    }
  },
  addToCart: (coffee: CoffeeType) => {
    const { cart } = get()

    const existingItem = cart.find((item) => item.id === coffee.id)
    if (existingItem) {
      const updateCart = cart.map((item) =>
        item.id === coffee.id ? { ...item, quantity: item.quantity + 1 } : item,
      )
      set({ cart: updateCart })
    } else {
      const newItem: OrderItem = {
        id: coffee.id,
        name: `${coffee.name} ${coffee.subTitle}`,
        size: "L",
        quantity: 1,
      }
      // set({ cart: cart ? [...cart, newItem] : [newItem] })
      set({ cart: [...cart, newItem] })
    }
  },
  clearCart: () => {
    set({ cart: [] })
  },
  setAddress: (address: string) => {
    set({ address })
  },
})

export const useCoffeeStore = create<
  ListState & ListActions & CartState & CartAction
>()(
  devtools(
    persist(coffeeSlice, {
      name: "coffeeStore",
      partialize: (state) => ({ cart: state.cart, address: state.address }),
    }),
    { name: "coffeeStore" },
  ),
)

export const getCoffeeList = (params?: getCoffeeListReqParams) =>
  useCoffeeStore.getState().getCoffeeList(params)
