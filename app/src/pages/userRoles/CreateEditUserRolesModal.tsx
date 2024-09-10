import React from 'react';

import Modal from 'components/common/modal';

import { User } from 'types/User';

import CreateEditUserRole from './CreateEditRole';

interface CreateEditUserRolesModalProps {
  title: string;
  isModalOpen: boolean;
  isSubmitting?: boolean;
  isEditable: boolean;
  closeModal: () => void;
  rowData: User | null;
  setShouldFetchUserRoles: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreateEditUserRolesModal(props: CreateEditUserRolesModalProps) {
  const {
    title,
    isModalOpen,
    isSubmitting,
    closeModal,
    rowData,
    isEditable,
    setShouldFetchUserRoles,
  } = props;

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      overlayClassName="delete-confirm"
      header={{
        title,
        className: 'delete-confirm__header',
      }}
    >
      <div className="omb-modal__content wp-100 p-4">
        <div className="row p-5x mr-4x wp-100">
          <div className="col-2x p-1x pr-3x" />
          <div className="col-8x p-1x">
            <CreateEditUserRole
              isSubmitting={isSubmitting}
              closeModal={closeModal}
              rowData={rowData}
              isEditable={isEditable}
              setShouldFetchUserRoles={setShouldFetchUserRoles}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default CreateEditUserRolesModal;
