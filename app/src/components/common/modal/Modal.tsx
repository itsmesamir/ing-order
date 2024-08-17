import React from 'react';
import ReactModal from 'react-modal';

import { classNames } from 'utils/className';

export interface ModalProps {
  isOpen: boolean;
  className?: string;
  onClose: () => void;
  children?: JSX.Element;
  overlayClassName?: string;
}

export default function Modal(props: ModalProps) {
  const { children, isOpen, onClose, className, overlayClassName } = props;

  return (
    <ReactModal
      className={classNames('modal', className)}
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName={classNames('overlay', overlayClassName)}
      preventScroll
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      shouldReturnFocusAfterClose
    >
      {children}
    </ReactModal>
  );
}
