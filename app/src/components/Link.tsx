/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import { Link as RouterLink } from 'react-router-dom';
import { Link as ChackraLink } from '@chakra-ui/react';

import { Any } from 'types/common';

function Link({
  children,
  to,
  as,
  passhref,
  replace,
  scroll,
  shallow,
  locale,
  nextLink,
  decoration,
  ...chackraProps
}: Any) {
  chackraProps._hover = {
    ...chackraProps._hover,
    textDecoration: decoration || 'none',
  };
  return (
    <RouterLink
      to={to}
      as={as}
      passhref={passhref}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      locale={locale}
      {...nextLink}
    >
      <ChackraLink {...chackraProps}>{children}</ChackraLink>
    </RouterLink>
  );
}

export default Link;
