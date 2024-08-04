import { Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import { MdSettings } from 'react-icons/md';

import Search from 'pages/layout/search/Search';

function Header() {
  const [searchItem, setSearchItem] = useState('');

  return (
    <nav className="flex justify-between max-h-16 h-16  items-center px-6 sticky top-0 z-50 bg-white">
      <div className="flex items-center gap-x-5">
        <Search searchItem={searchItem} setSearchItem={setSearchItem} />

        <Button colorScheme="orange">
          <MdSettings size={16} className="mr-2" /> Filter
        </Button>
      </div>

      <div className="flex">
        <div>location</div>
        <div>notification</div>
        <div>profile</div>
      </div>
    </nav>
  );
}

export default Header;
