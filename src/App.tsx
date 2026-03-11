import "./App.css"

import LiveClock from "./components/LiveClock"
import { SearchInput } from "./components/SearchInput"
import { CardList } from "./components/CardList"
import { CategoryPicker } from "./components/CategoryPicker"

function App() {
  return (
    <div /* className="wrapper" */>
      <LiveClock />
      <SearchInput />
      <CategoryPicker />
      <CardList />
    </div>
  )
}

export default App
