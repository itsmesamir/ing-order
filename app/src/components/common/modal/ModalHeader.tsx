import React from 'react';

import { classNames } from 'utils/className';

type ModalHeaderProps = {
  title?: string;
  className?: string;
};

function ModalHeader(props: ModalHeaderProps) {
  const { title, className } = props;

  return (
    <div className={classNames('flex items-center justify-between p-4', className)}>
      <p className="text-xl text-gray-800 font-semibold">{title}</p>;
    </div>
  );
}

export default ModalHeader;
