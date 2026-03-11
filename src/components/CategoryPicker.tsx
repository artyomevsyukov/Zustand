import { Button } from "antd"
import { CoffeeCategoryEnum } from "../types/storeTypes"
import { setParams, useCoffeeStore } from "../model/coffeeStore"
import { useSearchParams } from "react-router-dom"

export function CategoryPicker() {
  const [queryParams, setQueryParams] = useSearchParams()
  const type = useCoffeeStore((state) => state.params.type)

  const handleChangeSearchParams = (key: CoffeeCategoryEnum) => {
    const next = new URLSearchParams(queryParams)
    if (key) next.set("type", key)
    else next.delete("type")
    setQueryParams(next, { replace: true })

    setParams({ type: key })
  }

  return (
    <div>
      {Object.values(CoffeeCategoryEnum).map((key) => (
        // <Button key={category} onClick={() => setParams({ type: category })}>
        <Button
          key={key}
          danger={type === key}
          //   onClick={() => setParams({ type: CoffeeCategoryEnum[key] })}>
          onClick={() => handleChangeSearchParams(key)}>
          {key}
        </Button>
      ))}
    </div>
  )
}
