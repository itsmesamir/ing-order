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
      className={classNames('center group h-8 w-8 cursor-pointer', className)}
      aria-label="Expand Button"
    >
      <FiChevronRight
        className={classNames(
          'text-lg text-gray-500 duration-300 group-hover:text-orange-800',
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
