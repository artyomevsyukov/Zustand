import axios from "axios"
import type {
  CoffeeActions,
  CoffeeState,
  CoffeeType,
  getCoffeeListReqParams,
  OrderItem,
  OrderCoffeeRes,
} from "../types/coffeeTypes"
import { create, type StateCreator } from "zustand"
import { devtools, persist } from "zustand/middleware"

const BASE_URL = "https://purpleschool.ru/coffee-api"

const initialState: CoffeeState = {
  coffeeList: undefined,
  cart: undefined,
  address: undefined,
}

const coffeeSlice: StateCreator<
  CoffeeState & CoffeeActions,
  [["zustand/devtools", never], ["zustand/persist", unknown]]
> = (set, get) => ({
  ...initialState,

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
      const { data } = await axios.post<OrderCoffeeRes>(BASE_URL + "order", {
        address,
        orderItems: cart,
      })
      if (data) {
        alert(data.message)
        clearCart()
      }
    } catch (error) {
      console.log(error)
    }
  },
  addToCart: (coffee: CoffeeType) => {
    const { cart } = get()
    // let { cart } = get()
    // if (!cart) {
    //   cart = []
    // }
    const existingItem = cart.find((item) => item.id === coffee.id)
    if (existingItem) {
      const updateCart = cart.map((item) =>
        item.id === coffee.id ? { ...item, quantity: item.quantity + 1 } : item
      )
      set({ cart: updateCart })
    } else {
      const newItem: OrderItem = {
        id: coffee.id,
        name: `${coffee.name} ${coffee.subTitle}`,
        size: "L",
        quantity: 1,
      }
      set({ cart: cart ? [...cart, newItem] : [newItem] })
    }
  },
  clearCart: () => {
    set({ cart: undefined })
  },
  setAddress: (address: string) => {
    set({ address })
  },
})

// export const useCoffeeStore = create<CoffeeState & CoffeeActions>()(
//   devtools(coffeeSlice)
// )
export const useCoffeeStore = create<CoffeeState & CoffeeActions>()(
  devtools(
    persist(coffeeSlice, {
      name: "coffeeStore",
      partialize: (state) => ({ cart: state.cart, address: state.address }),
    }),
    { name: "coffeeStore" }
  )
)
