import axios from "axios"
import { type StateCreator } from "zustand"
import type {
  CartAction,
  CartState,
  CoffeeType,
  ListActions,
  ListState,
  OrderCoffeeRes,
  OrderItem,
} from "../types/storeTypes"
import { BASE_URL } from "../api/coreApi"

export const cartSlice: StateCreator<
  CartState & CartAction & ListActions & ListState,
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  CartState & CartAction
> = (set, get) => ({
  cart: [],
  address: "",
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
