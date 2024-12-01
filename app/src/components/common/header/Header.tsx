import { useState } from 'react';
import { Avatar, Badge, Button } from '@chakra-ui/react';
import { MdSettings, MdShoppingCart } from 'react-icons/md';

import useCartStore from 'stores/useCartStore';

import Search from 'components/search/Search';
import Link from 'components/Link';

import { createRoute } from 'utils/route';

import { User } from 'types/User';

import paths from 'constants/paths';

type HeaderProps = {
  currentUser: User | null;
};

function Header(props: HeaderProps) {
  const { currentUser } = props;

  const { summary } = useCartStore();

  const [searchItem, setSearchItem] = useState('');

  return (
    <nav className="flex-1 flex justify-between max-h-16 h-16  items-center sticky top-0 z-50 bg-white px-4">
      <div className="flex items-center gap-x-5">
        <Search searchItem={searchItem} setSearchItem={setSearchItem} />

        <Button colorScheme="orange">
          <MdSettings size={16} className="mr-2" /> Filter
        </Button>
      </div>

      <div className="flex items-center gap-x-4">
        <Link to={createRoute([paths.checkout])}>
          <div className="flex">
            <div className="relative">
              <Badge
                display="flex"
                alignItems="center"
                justifyContent="center"
                rounded={{ base: 'full' }}
                variant="solid"
                bgColor="orange.500"
                width="20px"
                height="20px"
                fontSize="12px"
                fontWeight="medium"
                textAlign="center"
                className="absolute -top-2 -right-2"
              >
                {summary.quantity}
              </Badge>

              <MdShoppingCart size={24} />
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-x-2 rounded-lg bg-grey-200 h-11 px-4">
          <Avatar height="32px" width="32px" name="Dan Abrahmov" src={currentUser?.imageUrl} />
          <p>{currentUser?.name}</p>
        </div>
      </div>
    </nav>
  );
}

export default Header;
