import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import OrderStatusColor from 'components/common/orders/OrderStatusColor';

import { Order } from 'types/common';

import paths from 'constants/paths';

import ItemCard from './ItemCard';

interface OrderCardProps {
  order: Order;
}

function OrderCard(props: OrderCardProps) {
  const { order } = props;

  const itemContainerClass = classNames(
    'flex-1 flex flex-col gap-y-1 overflow-y-auto scrollbar-gutter-stable px-4 pb-4',
    {
      'items-center justify-center': order.items.length === 0, // Center message for no items
      'items-center': order.items.length === 1, // Center item if only one
    }
  );

  return (
    <div className="flex flex-col border rounded-lg shadow bg-white h-60 overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold">{order.cafeName}</h2>
            <p className="text-sm text-grey-500">{order.cafeLocation}</p>
          </div>
          <OrderStatusColor status={order.status} />
        </div>

        <p className="text-grey-900 font-normal text-sm">{order.name}</p>

        <p className="text-grey-900 font-semibold text-sm">Total Price: ${order.totalPrice}</p>
      </div>
      <div className={itemContainerClass}>
        {order.items.length > 0 ? (
          order.items.map(item => <ItemCard key={item.id} item={item} />)
        ) : (
          <p className="text-sm italic text-grey-500">No items in this order.</p>
        )}
      </div>
    </div>
  );
}

export default OrderCard;
