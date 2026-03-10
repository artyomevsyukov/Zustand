import { useShallow } from "zustand/shallow"
import { useCoffeeStore } from "../model/coffeeStore"
import Cart from "./Cart"
import CoffeeCard from "./CoffeeCard"

export function CardList() {
  const [coffeeList] = useCoffeeStore(useShallow((state) => [state.coffeeList]))

  return (
    <>
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
    </>
  )
}
