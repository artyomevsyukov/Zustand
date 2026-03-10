import "./App.css"

import LiveClock from "./components/LiveClock"
import { SearchInput } from "./components/SearchInput"
import { CardList } from "./components/CardList"

function App() {
  return (
    <div /* className="wrapper" */>
      <LiveClock />
      <SearchInput />
      <CardList />
    </div>
  )
}

export default App
