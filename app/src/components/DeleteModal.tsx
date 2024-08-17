import { Button } from '@chakra-ui/button';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';

type DeleteModalProps = {
  isOpen: boolean;
  onOpen?: () => void;
  onClose: () => void;
  handleDelete: () => void;
};

function DeleteModal({ isOpen, onOpen, onClose, handleDelete }: DeleteModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete the Vaccine Tiltle</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Are you sure? You cant undo this action afterwards.</ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="red"
            isLoading={false}
            mr={3}
            onClick={e => {
              e.preventDefault();
              handleDelete();
            }}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default DeleteModal;
