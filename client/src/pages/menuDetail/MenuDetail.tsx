import React from 'react';
import { useParams } from 'react-router-dom';
import { Image, Progress, Stack } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

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
    <div className="flex bg-gray-100 pt-6 px-6">
      <div className="flex flex-1 mr-6">
        <div className="rounded-lg bg-white w-full p-4">
          <p>{menuItem.name}</p>
          <p>{menuItem.cafe?.name}</p>

          <div className="flex gap-3">
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

          <p className="mt-3 text-xl text-gray-600">{menuItem.description}</p>

          <MenuReview menuId={Number(id)} />
        </div>
      </div>

      <RightMenuDetail menuItem={menuItem} />
    </div>
  );
}

export default MenuDetail;
