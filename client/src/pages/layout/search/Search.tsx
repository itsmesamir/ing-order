import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

import Input from 'components/common/input';
import Modal from 'components/common/modal';

type SearchProps = {
  searchItem: string;
  setSearchItem: React.Dispatch<React.SetStateAction<string>>;
};

function Search(props: SearchProps) {
  const { searchItem, setSearchItem } = props;

  const [isOpen, setIsOpen] = useState(false);

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

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div>
          <div className="flex items-center gap-x-2">
            <FiSearch className="" size={16} />

            <Input
              name="searchItem"
              value={searchItem}
              label=""
              placeholder=""
              onChange={e => setSearchItem(e.target.value)}
              className="border-none"
            />
          </div>

          {/* Search item */}
          <div>search item</div>
        </div>
      </Modal>
    </div>
  );
}

export default Search;
