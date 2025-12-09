import "./App.css"
import { Button, Card, Input, Rate, Tag } from "antd"
import { useCoffeeStore } from "./model/coffeeStore"
import { useCallback, useEffect, useMemo, useState } from "react"
import { ShoppingCartOutlined } from "@ant-design/icons"
import { debounce } from "./utils/debounce"

function App() {
  const { getCoffeeList, coffeeList } = useCoffeeStore()
  const [inputValue, setInputValue] = useState<string | undefined>()

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

  return (
    <div /* className="wrapper" */>
      <Input
        placeholder="Поиск "
        value={inputValue}
        onChange={handleSearchChange}
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
