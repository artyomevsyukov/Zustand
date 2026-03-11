import { Input } from "antd"
import { getCoffeeList, setParams, useCoffeeStore } from "../model/coffeeStore"
import { useEffect } from "react"

export function SearchInput() {
  const text = useCoffeeStore((state) => state.params.text)
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    const next = new URLSearchParams(window.location.search)
    if (value) next.set("text", value)
    else next.delete("text")
    const nextSearch = next.toString()
    const nextUrl = `${window.location.pathname}${nextSearch ? `?${nextSearch}` : ""}${window.location.hash}`
    window.history.replaceState(null, "", nextUrl)

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
