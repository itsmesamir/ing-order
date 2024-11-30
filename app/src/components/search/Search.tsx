import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Image } from '@chakra-ui/react';

import Input from 'components/common/input';
import Modal from 'components/common/modal';

import { useMenusQuery } from 'hooks/useMenusQuery';

import { debounceInput } from 'utils/string';
import { createRoute } from 'utils/route';
import { interpolate } from 'utils/interpolate';

import paths from 'constants/paths';

type SearchProps = {
  searchItem: string;
  setSearchItem: React.Dispatch<React.SetStateAction<string>>;
};

function Search(props: SearchProps) {
  const { searchItem, setSearchItem } = props;

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const { data: menuData, isLoading: isMenuItemLoading } = useMenusQuery(
    {
      name: searchItem,
    },
    searchItem.length > 0
  );

  const menuItems = menuData?.data;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(event.target.value);
  };

  return (
    <div className="">
      <div
        tabIndex={0}
        role="button"
        onKeyUp={() => {}}
        onClick={() => setIsOpen(true)}
        className="flex bg-grey-100 px-4 py-2 items-center gap-x-2 rounded-lg w-96"
      >
        <FiSearch className="" size={16} />

        <p className="text-grey-300">Search by food name..</p>
      </div>

      <Modal
        className="search-modal"
        isOpen={isOpen}
        onClose={() => {
          setSearchItem('');
          setIsOpen(false);
        }}
      >
        <div>
          <div className="flex items-center gap-x-2 p-4">
            <FiSearch className="" size={16} />

            <Input
              inputRef={inputRef}
              name="searchItem"
              value={searchItem}
              label=""
              placeholder=""
              onChange={onChange}
              className="border-none"
            />
          </div>

          {/* Search item */}
          <div className="flex flex-col mt-4">
            {menuItems?.map(item => (
              <a
                className="flex items-center hover:bg-primary-100 p-4 cursor-pointer"
                href={interpolate(createRoute([paths.menus, paths.id, paths.detail]), {
                  id: item.id,
                })}
              >
                <Image
                  boxSize="40px"
                  objectFit="cover"
                  src={item?.imageUrl}
                  alt={item?.name}
                  className="rounded-lg"
                />
                <div className="ml-4">
                  <p className="text-grey-600 font-semibold">{item.name}</p>
                  <p className="text-sm text-grey-400">{item?.cafe?.name}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Search;
