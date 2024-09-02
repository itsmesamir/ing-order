import { Redirect, Route, Switch } from 'react-router-dom';

import MenuDetail from 'pages/menuDetail';

import useCartStore from 'stores/useCartStore';

import Order from 'components/order/Order';
import MenuItemList from 'components/MenuItemList';

import { useMenusQuery } from 'hooks/useMenusQuery';

import { createRoute } from 'utils/route';

import paths from 'constants/paths';

import RightColumn from './RightColumn';

// function MenuWrapper() {
//   return (
//     <div className="flex">
//       <DashboardDrawer />
//       <RightColumn />
//     </div>
//   );
// }

function HomeComponent() {
  const { items } = useCartStore();

  const { data: menuItems, isLoading: isMenuItemLoading } = useMenusQuery({});

  if (!menuItems || isMenuItemLoading) {
    return <>Loading...</>;
  }

  return (
    <Switch>
      <Route
        exact
        path={createRoute([paths.menus, paths.list])}
        render={() => (
          <RightColumn>
            {/* body */}
            <div className="flex bg-grey-100 pt-6">
              <div className="flex flex-wrap gap-12 flex-1  justify-center px-6">
                <MenuItemList menuItems={menuItems} />
              </div>

              {/* Order */}
              <div className="sticky top-[64px] right-0 w-80 pr-6 h-[70vh]">
                <Order />
              </div>
            </div>
          </RightColumn>
        )}
      />

      <Route
        exact
        path={createRoute([paths.menus, paths.id, paths.detail])}
        render={() => (
          <RightColumn>
            <MenuDetail />
          </RightColumn>
        )}
      />

      <Redirect to={createRoute([paths.menus, paths.list])} />
    </Switch>
  );
}

export default HomeComponent;
