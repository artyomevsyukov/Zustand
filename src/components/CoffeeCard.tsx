import { Button, Card, Rate, Tag } from "antd"
import { ShoppingCartOutlined } from "@ant-design/icons"
import type { CoffeeType } from "../types/storeTypes"
import { useCoffeeStore } from "../model/coffeeStore"

function CoffeeCard({ coffee }: { coffee: CoffeeType }) {
  const { addToCart } = useCoffeeStore()

  const handleAddToCart = (coffee: CoffeeType) => (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart(coffee)
  }

  return (
    <Card
      hoverable
      key={coffee.id}
      cover={<img alt={coffee.name} src={coffee.image} />}
      actions={[
        <Button
          icon={<ShoppingCartOutlined />}
          key={`cart-${coffee.id}`}
          onClick={handleAddToCart(coffee)}>
          {coffee.price} ₽
        </Button>,
      ]}>
      <Card.Meta title={coffee.name} description={coffee.subTitle} />
      <Tag style={{ marginTop: "24px" }} color="purple">
        {coffee.type}
      </Tag>
      <Rate
        defaultValue={coffee.rating}
        disabled
        allowHalf
        style={{ marginTop: "24px" }}
      />
    </Card>
  )
}

export default CoffeeCard
