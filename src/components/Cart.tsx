import { Button, Input } from "antd"
import { useCoffeeStore } from "../model/coffeeStore"

function Cart() {
  const { cart, clearCart, orderCoffee, address, setAddress } = useCoffeeStore()

  return (
    <aside className="cart">
      <h1> Заказ</h1>
      {cart && cart.length > 0 ? (
        <>
          {cart.map((item) => (
            <div key={item.id}>
              {item.name} - {item.quantity}
            </div>
          ))}
          <Input
            placeholder="Введите адрес: "
            value={address}
            onChange={(e) => {
              setAddress(e.target.value)
            }}
          />
          <Button
            type="primary"
            onClick={orderCoffee}
            disabled={!address.trim()}>
            Сделать заказ
          </Button>
          <Button onClick={clearCart}>Очистить корзину</Button>
        </>
      ) : (
        <span>Добавьте напитки</span>
      )}
    </aside>
  )
}

export default Cart
