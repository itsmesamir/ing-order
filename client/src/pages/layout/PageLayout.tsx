import React from 'react';

import Sidebar from './Sidebar';
import RightColumn from './RightColumn';

function PageLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <RightColumn />
    </div>
  );
}

export default PageLayout;
