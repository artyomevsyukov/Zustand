import "./App.css"
import { addTen } from "./helpers/addTen"
import { useCounterStore } from "./model/counterStore"

function App() {
  const { counter, increment, decrement } = useCounterStore()

  return (
    <div className="wrapper">
      <button onClick={decrement}>-</button>
      <span> {counter} </span>
      <button onClick={increment}>+</button>
      <button onClick={addTen}>addTen</button>
    </div>
  )
}

export default App
