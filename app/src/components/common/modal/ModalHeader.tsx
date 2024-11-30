import React from 'react';

import { classNames } from 'utils/className';

type ModalHeaderProps = {
  icon?: React.ReactNode;
  title?: string;
  className?: string;
};

function ModalHeader(props: ModalHeaderProps) {
  const { icon, title, className } = props;

  return (
    <div className={classNames('flex items-center gap-x-4 p-4', className)}>
      {icon}

      <p className="text-xl text-grey-800 font-semibold">{title}</p>
    </div>
  );
}

export default ModalHeader;
