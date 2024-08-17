import { useState } from 'react';
import { Flex } from '@chakra-ui/layout';
import { useDisclosure } from '@chakra-ui/hooks';

import DeleteModal from 'components/DeleteModal';
import LeaveCard from 'components/LeaveCard';

import { Leave } from 'types/Leave';

interface LeaveListProps {
  leaves: Leave[];
}

function LeaveList({ leaves }: LeaveListProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [leaveId, setLeaveId] = useState<number | null>(null);

  const handleModalOpen = (leaveId: number) => {
    onOpen();
    setLeaveId(leaveId);
  };

  const handleDelete = () => {
    if (leaveId) {
      // deleteleave(LeaveId)).then(() => {
      //   onClose();
      // });
    }
  };

  return (
    <Flex
      border="1px solid gray.400"
      borderRadius="10px"
      p={2}
      direction="column"
      maxW="4xl"
      mx="auto"
    >
      <DeleteModal isOpen={isOpen} onClose={onClose} handleDelete={handleDelete} />

      {leaves.map((leave: Leave) => {
        return <LeaveCard key={leave.id} leave={leave} handleModalOpen={handleModalOpen} />;
      })}
    </Flex>
  );
}

export default LeaveList;
