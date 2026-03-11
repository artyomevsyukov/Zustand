import { Input } from "antd"
import { getCoffeeList, useCoffeeStore } from "../model/coffeeStore"
import { useSearchParams } from "react-router-dom"
import { useEffect } from "react"

export function SearchInput() {
  const text = useCoffeeStore((state) => state.params.text)
  const setParams = useCoffeeStore((state) => state.setParams)
  const [queryParams, setQueryParams] = useSearchParams()

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    const next = new URLSearchParams(queryParams)
    if (value) next.set("text", value)
    else next.delete("text")
    setQueryParams(next, { replace: true })

    setParams({ text: value || undefined })
  }

  useEffect(() => {
    getCoffeeList({ text })
  }, [text])

  return (
    <Input
      placeholder="Поиск "
      value={text ?? ""}
      onChange={handleSearchChange}
    />
  )
}
