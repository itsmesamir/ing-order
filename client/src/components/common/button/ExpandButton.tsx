import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import { classNames } from 'utils/className';

interface ExpandButtonProps {
  onExpand: (event: unknown) => void;
  isExpanded: boolean;
  className?: string;
  iconClassName?: string;
}

function ExpandButton(props: ExpandButtonProps) {
  const { onExpand, isExpanded, className, iconClassName } = props;

  return (
    <button
      type="button"
      onClick={onExpand}
      className={classNames(
        'center group h-8 w-8 cursor-pointer rounded-full text-right hover:bg-tertiary-blue-15',
        className
      )}
      aria-label="Expand Button"
    >
      <FiChevronRight
        className={classNames(
          'text-lg text-grey-40 duration-300 group-hover:text-tertiary-blue-60',
          {
            'rotate-90': isExpanded,
          },
          iconClassName
        )}
      />
    </button>
  );
}

export default ExpandButton;
