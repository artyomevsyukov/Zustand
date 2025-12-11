export type CoffeeTypeName = "americano" | "cappuccino" | "latte" | "macchiato"

export type CoffeeType = {
  id: number
  name: string
  subTitle: string
  type: CoffeeTypeName
  price: number
  image: string
  rating: number
}

export type CoffeeState = {
  coffeeList?: CoffeeType[]
  cart?: OrderItem[]
  address?: string
}

export type CoffeeActions = {
  getCoffeeList: (params?: getCoffeeListReqParams) => Promise<void>
  addToCart: (coffee: CoffeeType) => void
  clearCart: () => void
  setAddress: (address: string) => void
  orderCoffee: () => Promise<void>
}

export type getCoffeeListReqParams = {
  text?: string
}

export type OrderItem = {
  id: number
  name: string
  size: "L"
  quantity: number
}

export type OrderCoffeeReq = {
  address: string
  orderItem: OrderItem[]
}

export type OrderCoffeeRes = {
  message: string
  success: boolean
}
