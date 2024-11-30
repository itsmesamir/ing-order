import React from 'react';
import { Heading, Link } from '@chakra-ui/react';

import { createRoute } from 'utils/route';

import { Any } from 'types/common';

import paths from 'constants/paths';

function Header({ currentUser }: { currentUser: Any }) {
  return (
    <div className="flex justify-between m-2 p-2">
      <Link href={createRoute([paths.menus])} className="semibold">
        <Heading size="md"> Home </Heading>
      </Link>

      {!currentUser && (
        <div>
          <Link href={paths.signin}>Sign in</Link>
          <Link href={paths.signup}>Sign up</Link>
        </div>
      )}

      {currentUser && (
        <div>
          <div>Sign out</div>
        </div>
      )}
    </div>
  );
}

export default Header;
