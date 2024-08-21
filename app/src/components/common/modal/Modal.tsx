import React from 'react';
import ReactModal from 'react-modal';

import { classNames } from 'utils/className';

import ModalHeader from './ModalHeader';

export interface ModalProps {
  isOpen: boolean;
  className?: string;
  onClose: () => void;
  children?: JSX.Element;
  overlayClassName?: string;
  header?: {
    title?: string;
    className?: string;
  };
}

export default function Modal(props: ModalProps) {
  const { children, isOpen, onClose, className, overlayClassName, header } = props;

  return (
    <ReactModal
      className={classNames({
        [`${className}`]: Boolean(className),
        modal: !className,
      })}
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName={classNames('modal-overlay', overlayClassName)}
      preventScroll
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      shouldReturnFocusAfterClose
    >
      <ModalHeader title={header?.title} className={header?.className} />

      {children}
    </ReactModal>
  );
}
