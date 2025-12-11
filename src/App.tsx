import "./App.css"

import { Button, Card, Input, Rate, Tag } from "antd"
import { useCoffeeStore } from "./model/coffeeStore"
import { useCallback, useEffect, useMemo, useState } from "react"
import { ShoppingCartOutlined } from "@ant-design/icons"
import { debounce } from "./utils/debounce"
import type { CoffeeType } from "./types/coffeeTypes"

function App() {
  const {
    getCoffeeList,
    coffeeList,
    addToCart,
    cart,
    clearCart,
    orderCoffee,
    address,
    setAddress,
  } = useCoffeeStore()
  const [inputValue, setInputValue] = useState<string>("")

  const searchFunction = useCallback(
    (text: string) => {
      getCoffeeList(text ? { text } : undefined)
    },
    [getCoffeeList]
  )

  const debouncedSearch = useMemo(
    () => debounce(searchFunction, 300),
    [searchFunction]
  )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    setInputValue(text)
    debouncedSearch(text)
  }

  useEffect(() => {
    getCoffeeList()
  }, [getCoffeeList])

  const handleAddToCart = (coffee: CoffeeType) => (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart(coffee)
    console.log("cart: ", cart)
  }

  return (
    <div /* className="wrapper" */>
      <Input
        placeholder="Поиск "
        value={inputValue}
        onChange={handleSearchChange}
      />
      {coffeeList && (
        <div style={{ display: "flex" }}>
          <div className="cardsContainer">
            {coffeeList.map((coffee) => (
              <Card
                hoverable
                key={coffee.id}
                cover={<img alt={coffee.name} src={coffee.image} />}
                actions={[
                  <Button
                    icon={<ShoppingCartOutlined />}
                    key={coffee.name}
                    onClick={handleAddToCart(coffee)}>
                    {coffee.price} ₽
                  </Button>,
                ]}>
                <Card.Meta title={coffee.name} description={coffee.subTitle} />
                <Tag style={{ marginTop: "24px" }} color="purple">
                  {coffee.type}
                </Tag>
                <Rate
                  defaultValue={coffee.rating}
                  disabled
                  allowHalf
                  style={{ marginTop: "24px" }}
                />
              </Card>
            ))}
          </div>
          <aside className="cart">
            <h1> Заказ</h1>
            {cart && cart.length > 0 ? (
              <>
                {cart.map((item, index) => (
                  <div key={index}>
                    {item.name} - {item.quantity}
                  </div>
                ))}
                <Input
                  placeholder="Введите адрес: "
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value)
                  }}
                />
                <Button
                  type="primary"
                  onClick={orderCoffee}
                  disabled={!address}>
                  Сделать заказ
                </Button>
                <Button onClick={clearCart}>Очистить корзину</Button>
              </>
            ) : (
              <span>Добавьте напитки</span>
            )}
          </aside>
        </div>
      )}
    </div>
  )
}

export default App
