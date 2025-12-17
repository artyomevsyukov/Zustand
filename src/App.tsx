import "./App.css"

import { Button, Card, Input, Rate, Tag } from "antd"
import { useCoffeeStore } from "./model/coffeeStore"
import { useEffect } from "react"
import { ShoppingCartOutlined } from "@ant-design/icons"
import type { CoffeeType } from "./types/coffeeTypes"
// import { useSearchStore } from "./model/searchStore"
import LiveClock from "./components/LiveClock"
// import useUrlStorage from "./helpers/useUrlStorage"
import { useSearchParams } from "react-router-dom"

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
    // params,
    // setParams,
  } = useCoffeeStore()

  // const { text, setText } = useSearchStore()

  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const text = e.target.value
  //   setParams({ text })
  // }

  // useEffect(() => {
  //   getCoffeeList(params)
  // }, [getCoffeeList, params])

  // useUrlStorage(params, setParams)

  const [queryParams, setQueryParams] = useSearchParams()

  const searchText = queryParams.get("text") ?? ""

  // 2. Обработчик меняет ТОЛЬКО URL
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    // Если текст есть — ставим его, если пустой — удаляем параметр из URL совсем
    if (value) {
      setQueryParams({ text: value }, { replace: true })
    } else {
      setQueryParams({}, { replace: true })
    }
  }

  useEffect(() => {
    getCoffeeList({ text: searchText })
  }, [getCoffeeList, searchText])

  const handleAddToCart = (coffee: CoffeeType) => (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart(coffee)
    console.log("cart: ", cart)
  }

  return (
    <div /* className="wrapper" */>
      <LiveClock />
      <Input
        placeholder="Поиск "
        value={searchText}
        // value={params.text}
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
                    key={`cart-${coffee.id}`}
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
                {cart.map((item) => (
                  <div key={item.id}>
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
                  disabled={!address.trim()}>
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
