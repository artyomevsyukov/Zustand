import "./App.css"
import { Button, Card, Input, Rate, Tag } from "antd"
import { useCoffeeStore } from "./model/coffeeStore"
import { useEffect, useState } from "react"
import { ShoppingCartOutlined } from "@ant-design/icons"

function App() {
  const { getCoffeeList, coffeeList } = useCoffeeStore()
  const [inputValue, setInputValue] = useState<string | undefined>()
  const inputHandler = (text: string) => {
    getCoffeeList({ text: text })
    setInputValue(text)
  }

  useEffect(() => {
    getCoffeeList()
  }, [getCoffeeList])

  return (
    <div /* className="wrapper" */>
      <Input
        placeholder="Поиск "
        value={inputValue}
        onChange={(e) => inputHandler(e.target.value)}
      />
      {coffeeList && (
        <div className="cardsContainer">
          {coffeeList.map((coffee) => (
            <Card
              hoverable
              key={coffee.id}
              cover={<img alt={coffee.name} src={coffee.image} />}
              actions={[
                <Button icon={<ShoppingCartOutlined />} key={coffee.name}>
                  {coffee.price}
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
      )}
    </div>
  )
}

export default App
