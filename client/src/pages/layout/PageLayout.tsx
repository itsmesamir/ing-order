import DashboardDrawer from 'pages/dashboard/components/DashboardDrawer';

import RightColumn from './RightColumn';

function PageLayout() {
  return (
    <div className="flex">
      <DashboardDrawer />
      <RightColumn />
    </div>
  );
}

export default PageLayout;
