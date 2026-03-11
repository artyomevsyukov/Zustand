import { Button } from "antd"
import { CoffeeCategoryEnum } from "../types/storeTypes"
import { setParams, useCoffeeStore } from "../model/coffeeStore"

export function CategoryPicker() {
  const type = useCoffeeStore((state) => state.params.type)

  const handleChangeSearchParams = (key: CoffeeCategoryEnum) => {
    const next = new URLSearchParams(window.location.search)
    if (key) next.set("type", key)
    else next.delete("type")
    const nextSearch = next.toString()
    const nextUrl = `${window.location.pathname}${nextSearch ? `?${nextSearch}` : ""}${window.location.hash}`
    window.history.replaceState(null, "", nextUrl)

    setParams({ type: key })
  }

  return (
    <div>
      {Object.values(CoffeeCategoryEnum).map((key) => (
        <Button
          key={key}
          danger={type === key}
          onClick={() => handleChangeSearchParams(key)}>
          {key}
        </Button>
      ))}
    </div>
  )
}
