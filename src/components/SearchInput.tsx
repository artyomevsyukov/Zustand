import { Input } from "antd"
import { getCoffeeList, useCoffeeStore } from "../model/coffeeStore"
import { useSearchParams } from "react-router-dom"
import { useEffect } from "react"
import { useShallow } from "zustand/shallow"

export function SearchInput() {
  const params = useCoffeeStore(useShallow((state) => state.params))
  const setParams = useCoffeeStore((state) => state.setParams)
  const [, setQueryParams] = useSearchParams()

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (value) {
      setQueryParams({ text: value }, { replace: true })
    } else {
      setQueryParams({}, { replace: true })
    }

    setParams({ text: value || undefined })
  }

  useEffect(() => {
    getCoffeeList({ text: params.text })
  }, [params.text])

  return (
    <Input
      placeholder="Поиск "
      value={params.text ?? ""}
      onChange={handleSearchChange}
    />
  )
}
