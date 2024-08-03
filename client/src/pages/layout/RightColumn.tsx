import MenuItemList from 'components/MenuItemList';

import Order from './order/Order';

function RightColumn() {
  return (
    <div className="flex flex-col flex-1">
      <nav className="flex justify-between max-h-16 h-16  items-center px-6 sticky top-0 z-50 bg-white">
        <div className="flex">
          <div>search</div>
          <div>filter</div>
        </div>

        <div className="flex">
          <div>location</div>
          <div>notification</div>
          <div>profile</div>
        </div>
      </nav>

      {/* body */}
      <div className="flex">
        <div className="flex flex-wrap gap-12 flex-1  justify-center px-6">
          <MenuItemList />
        </div>

        {/* Order */}
        <div className="sticky top-[64px] right-0 w-80 pr-6 h-[70vh]">
          <Order />
        </div>
      </div>
    </div>
  );
}

export default RightColumn;
