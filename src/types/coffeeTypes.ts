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
}

export type CoffeeActions = {
  getCoffeeList: (params?: getCoffeeListReqParams) => Promise<void>
}

export type getCoffeeListReqParams = {
  text?: string
}
