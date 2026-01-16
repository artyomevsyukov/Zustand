import "./App.css"

import { Input } from "antd"
import { useCoffeeStore } from "./model/coffeeStore"
import { useEffect } from "react"
import LiveClock from "./components/LiveClock"
import { useSearchParams } from "react-router-dom"
import CoffeeCard from "./components/CoffeeCard"
import Cart from "./components/Cart"

function App() {
  const { getCoffeeList, coffeeList } = useCoffeeStore()

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

  return (
    <div /* className="wrapper" */>
      <LiveClock />
      <Input
        placeholder="Поиск "
        value={searchText}
        onChange={handleSearchChange}
      />
      {coffeeList && (
        <div style={{ display: "flex" }}>
          <div className="cardsContainer">
            {coffeeList.map((coffee) => (
              <CoffeeCard coffee={coffee} />
            ))}
          </div>
          <Cart />
        </div>
      )}
    </div>
  )
}

export default App
