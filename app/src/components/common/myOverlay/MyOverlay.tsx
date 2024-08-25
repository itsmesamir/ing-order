import React from 'react';
import ReactModal from 'react-modal';
import { FaCross } from 'react-icons/fa';

import { useHandleKey } from 'hooks/useHandleKey';

import { classNames } from 'utils/className';

import { keyCode } from 'constants/keycodes';

interface OverlayProps {
  title: string;
  isOpen: boolean;
  body: JSX.Element;
  onClose: () => void;
  className?: string;
  classes?: {
    headerClassName?: string;
  };
  shouldCloseOnOverlayClick?: boolean;
  showCloseIcon?: boolean;
  footer?: JSX.Element;
  headerTrailing?: JSX.Element | null;
  parentScroll?: boolean;
  isPrivate?: boolean;
}

function MyOverlay(props: OverlayProps) {
  const {
    title,
    isOpen,
    className,
    classes,
    onClose,
    shouldCloseOnOverlayClick,
    parentScroll = false,
    showCloseIcon = false,
    headerTrailing,
    body,
    footer,
    isPrivate,
  } = props;

  useHandleKey(isOpen ? onClose : () => {}, keyCode.esc);

  const closeTimeoutMS = 300;

  return (
    <ReactModal
      closeTimeoutMS={closeTimeoutMS}
      preventScroll
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      className={classNames(
        'overlay-content',
        {
          'overlay-content--close': !isOpen,
        },
        className
      )}
      overlayClassName={classNames('overlay')}
      bodyOpenClassName={classNames({
        'overflow-y-auto scrollbar-gutter-stable': parentScroll,
        'overflow-y-hidden': !parentScroll,
      })}
    >
      {showCloseIcon && (
        <div
          role="button"
          onKeyUp={() => {}}
          tabIndex={0}
          aria-label="Close"
          className="w-8 h-8 rounded-full center hover:bg-primary-100 absolute right-4 top-4 cursor-pointer group"
          onClick={onClose}
        >
          <FaCross size={20} className="group-hover:text-primary-800" />
        </div>
      )}

      <div
        className={classNames(
          'py-5 px-6 border-b-2 border-solid border-grey-10',
          classes?.headerClassName
        )}
      >
        <p className={classNames('text-xl to-grey-80 font-semibold line-clamp-2 mr-4')}>{title}</p>

        {headerTrailing && headerTrailing}
      </div>
      <div className="flex flex-col overflow-hidden flex-1">{body}</div>
    </ReactModal>
  );
}

export default MyOverlay;
