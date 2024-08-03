import DashboardDrawer from 'pages/dashboard/components/DashboardDrawer';

import useCartStore from 'stores/useCartStore';

import RightColumn from './RightColumn';

function PageLayout() {
  // Initialize this in the top component
  const { items } = useCartStore();

  return (
    <div className="flex">
      <DashboardDrawer />
      <RightColumn />
    </div>
  );
}

export default PageLayout;
