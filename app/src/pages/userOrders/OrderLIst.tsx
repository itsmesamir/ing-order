import { Order } from 'types/common';

import OrderCard from './OrderCard';

interface OrderListProps {
  orders: Order[];
}

function OrderList(props: OrderListProps) {
  const { orders } = props;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {orders?.map(order => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}

export default OrderList;
