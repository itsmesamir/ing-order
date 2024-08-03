import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Image } from '@chakra-ui/react';

import Input from 'components/common/input';
import Modal from 'components/common/modal';

import { useMenusQuery } from 'hooks/useMenusQuery';

import { debounceInput } from 'utils/string';

type SearchProps = {
  searchItem: string;
  setSearchItem: React.Dispatch<React.SetStateAction<string>>;
};

function Search(props: SearchProps) {
  const { searchItem, setSearchItem } = props;

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const { data: menuItems, isLoading: isMenuItemLoading } = useMenusQuery(
    {
      name: searchItem,
    },
    searchItem.length > 0
  );

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(event.target.value);
  };

  // useEffect(() => {
  //   console.log('useeffect', isOpen, inputRef?.current);
  //   if (isOpen && inputRef?.current) {
  //     console.log('inputRef', inputRef.current);
  //     inputRef.current.focus();
  //   }
  // }, [isOpen]);

  return (
    <div className="">
      <div
        tabIndex={0}
        role="button"
        onKeyUp={() => {}}
        onClick={() => setIsOpen(true)}
        className="flex bg-gray-100 px-4 py-2 items-center gap-x-2 rounded-lg w-96"
      >
        <FiSearch className="" size={16} />

        <p className="text-gray-300">Search by food name..</p>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          setSearchItem('');
          setIsOpen(false);
        }}
      >
        <div>
          <div className="flex items-center gap-x-2">
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
          <div className="flex flex-col gap-y-4 mt-4">
            {menuItems?.map(item => (
              <div className="flex items-center">
                <Image
                  boxSize="40px"
                  objectFit="cover"
                  src={item?.imageUrl}
                  alt={item?.name}
                  className="rounded-lg"
                />
                <div className="ml-4">
                  <p className="text-gray-600 font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-400">{item?.cafe?.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Search;
