import React from 'react';

import { OrderItem } from 'types/common';

interface ItemCardProps {
  item: OrderItem;
}

function ItemCard(props: ItemCardProps) {
  const { item } = props;
  const { menu, price, discount, quantity } = item;

  return (
    <div className="flex items-center space-x-3 border-b pb-2">
      {menu?.imageUrl && (
        <img src={menu.imageUrl} alt={menu.name || ''} className="w-12 h-12 rounded" />
      )}

      <div className="flex-1">
        <p className="font-semibold">{menu?.name || 'Unknown Item'}</p>
        <p className="text-sm text-grey-500">{menu?.cafe?.name}</p>
      </div>

      <div className="w-24">
        <p className="text-sm font-medium">${price || '0.00'}</p>
        {!!discount && <p className="text-sm text-secondary-600">Discount: ${discount}</p>}
        {quantity && <p className="text-sm font-medium">Qty: {quantity}</p>}
      </div>
    </div>
  );
}

export default ItemCard;
