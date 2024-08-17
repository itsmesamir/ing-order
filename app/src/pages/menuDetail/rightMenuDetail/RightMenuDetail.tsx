import React, { useMemo, useState } from 'react';
import { MdAccessTime, MdLocationOn } from 'react-icons/md';

import useCartStore from 'stores/useCartStore';

import ItemCounter from 'components/ItemCounter';

import { CartItem, MenuItem } from 'types/common';

import en from 'constants/en';

function Card({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex flex-1 items-center justify-center bg-gray-100 rounded h-20 w-36">
      <div className="flex flex-col center">
        {icon}
        <p className="mt-1 text-xl font-medium text-gray-600">{title}</p>
      </div>
    </div>
  );
}

type RightMenuDetailProps = {
  menuItem: MenuItem;
};

function RightMenuDetail(props: RightMenuDetailProps) {
  const { menuItem } = props;

  const { addItem, items: carts } = useCartStore();

  const [count, setCount] = useState(1);

  const cartItem = carts.find((cart: CartItem) => cart.menu?.id === menuItem.id);

  const totalPrice = useMemo(() => {
    return menuItem.price * (cartItem?.quantity || 1);
  }, [cartItem?.quantity, menuItem.price]);

  return (
    <div className="w-96 bg-white rounded-lg px-5 py-6 h-fit max-h-[70hv] border-[1.5px] border-solid border-orange-500">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-medium text-gray-600">{en.ORDER.PRICE}</p>

        <p className="text-3xl font-medium text-orange-600 mt-3">
          {en.ORDER.CURRENCY} {menuItem.price}
        </p>
      </div>

      <div className="flex gap-x-2 mt-6 justify-center">
        <Card icon={<MdAccessTime size={28} />} title="25 Minutes" />

        <Card icon={<MdLocationOn size={28} />} title="5 Km" />
      </div>

      <div className="flex gap-x-6 items-center mt-6 justify-center">
        <p className="text-xl font-medium text-gray-600">{en.ORDER.QUANTITY}</p>

        <ItemCounter
          count={cartItem?.quantity || 1}
          variant="rounded"
          size="md"
          countText={{
            fontSize: '32px',
            fontWeight: 'medium',
          }}
          handleCount={count => setCount(count)}
        />
      </div>

      <div className="mt-6 flex items-center justify-center gap-x-6">
        <p className="text-xl font-medium text-gray-600">{en.ORDER.TOTAL_PRICE}</p>

        <p className="text-3xl font-medium text-orange-600 mt-3">
          {en.ORDER.CURRENCY} {totalPrice}
        </p>
      </div>

      <div className="w-100 mt-8 center">
        <button
          type="button"
          onClick={() => {
            addItem({
              menu: menuItem,
              quantity: 1,
              price: menuItem.price,
              discount: menuItem.discount,
            });
          }}
          className="w-full text-center text-xl font-medium h-14 center rounded bg-orange-600 px-3  leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {en.BUTTON.ADD_TO_CART}
        </button>
      </div>
    </div>
  );
}

export default RightMenuDetail;
