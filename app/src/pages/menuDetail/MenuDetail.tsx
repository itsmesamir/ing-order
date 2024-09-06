import { Image } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import Order from 'components/order/Order';

import { useMenuByIdQuery } from 'hooks/useMenuByIdQuery';

import RightMenuDetail from './rightMenuDetail/RightMenuDetail';
import MenuReview from './menuReview';

function MenuDetail() {
  const { id } = useParams<{ id: string }>();

  const { data: menuItem, isLoading: isMenuItemLoading } = useMenuByIdQuery(Number(id));

  if (!menuItem || isMenuItemLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex bg-grey-100 pt-6 px-6">
      <div className="flex flex-1 mr-6">
        <div className="rounded-lg bg-white w-full p-4">
          <div className="flex gap-x-4">
            <div className="flex gap-3 flex-col flex-1">
              <Image
                height="400px"
                objectFit="cover"
                src={menuItem?.imageUrl}
                alt="Dan Abramov"
                className="rounded-lg w-full"
              />

              <Image
                height="128px"
                width="180px"
                objectFit="cover"
                src={menuItem?.imageUrl}
                alt="Dan Abramov"
                className="rounded-lg "
              />
            </div>

            <RightMenuDetail menuItem={menuItem} />
          </div>

          <p className="text-3xl font-medium mt-6">{menuItem.name}</p>

          <p className="text-base text-grey-400 mt-3">{menuItem.cafe?.name}</p>

          <p className="mt-4 text-xl text-grey-700">{menuItem.description}</p>

          <MenuReview menuId={Number(id)} />
        </div>
      </div>

      <div className="sticky top-[64px] right-0 w-80 pr-6 h-[70vh]">
        <Order />
      </div>
    </div>
  );
}

export default MenuDetail;
