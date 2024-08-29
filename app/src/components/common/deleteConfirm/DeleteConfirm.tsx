import React from 'react';
import classnames from 'classnames';
import { icons } from 'react-icons';
import { AiFillExclamationCircle } from 'react-icons/ai';

import Modal from '../modal';
import Loading from '../Loading';

interface DeleteConfirmProps {
  actionLabel: string;
  title: string;
  className?: string;
  isModalOpen: boolean;
  isSubmitting?: boolean;
  cancelLabel?: string;
  message: string;
  children?: JSX.Element[] | JSX.Element;
  onApplyClick: () => void;
  closeModal: () => void;
  options?: { type: 'danger' | 'warning' | 'success' };
}

function DeleteConfirm(props: DeleteConfirmProps) {
  const {
    actionLabel,
    title,
    isModalOpen,
    children,
    className,
    cancelLabel = 'Cancel',
    isSubmitting,
    onApplyClick,
    closeModal,
    message,
    options = { type: 'danger' },
  } = props;

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      overlayClassName="delete-confirm"
      header={{
        icon: (
          <AiFillExclamationCircle
            size={22}
            className={classnames({
              'text-error-base': options.type === 'danger',
              'color-tertiary-yellow-60': options.type === 'warning',
              'color-tertiary-green-60': options.type === 'success',
            })}
          />
        ),
        title,
        className: 'delete-confirm__header',
      }}
    >
      <div className="omb-modal__content wp-100 p-4">
        <div className="row p-5x mr-4x wp-100">
          <div className="col-2x p-1x pr-3x" />
          <div className="col w-400 break-word flex-1">
            <p className="text-xl">{message}</p>

            {children && <div className="mt-4x">{children}</div>}

            <div className="omb-modal__buttons d-flex pt-4">
              <button
                type="submit"
                onClick={onApplyClick}
                className={classnames(
                  'btn min-wpx-100 d-flex justify-content-center position-relative',
                  className,
                  {
                    'btn--red': options.type === 'danger',
                    'btn--yellow': options.type === 'warning',
                    'btn--green': options.type === 'success',
                  }
                )}
              >
                <span className={classnames({ 'visibility-hidden': isSubmitting })}>
                  {actionLabel}
                </span>
                {isSubmitting && <Loading />}
              </button>

              <button
                type="button"
                className="btn btn--outlined-grey ml-3x wpx-100"
                onClick={closeModal}
              >
                {cancelLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteConfirm;
