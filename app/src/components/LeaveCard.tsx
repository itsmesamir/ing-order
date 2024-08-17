import { useState } from 'react';
import { IconButton } from '@chakra-ui/button';
import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/layout';
import { Tooltip } from '@chakra-ui/tooltip';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';

import { Leave } from 'types/Leave';

import routes from 'constants/routes';

import Link from './Link';

interface LeaveCardProps {
  handleModalOpen: (leave_id: number) => void;
  leave: Leave;
}

function LeaveCard(props: LeaveCardProps) {
  const { handleModalOpen, leave } = props;

  const [isMandatory, setMandatory] = useState(false);
  return (
    <Link
      passhref
      to={routes.applyleave}
      borderBottom="1px solid"
      borderColor="gray.200"
      _hover={{ bg: 'gray.50' }}
    >
      <Box display="flex" boxShadow="md" borderRadius={10} p={[0, 2, 4]} my={[4, 4]} bg="white">
        <Stack flexGrow="1" ml={[3, 4]}>
          <Flex display={['block', 'flex']} justify="space-between">
            <Flex direction="column">
              <Heading fontSize={['md', 'lg']}>{leave.type}</Heading>
            </Flex>

            <Flex>
              <Tooltip label="Mark Mandatory" aria-label="Favorite Ads">
                <IconButton
                  ml={1}
                  size="sm"
                  onClick={e => {
                    e.preventDefault();
                    return setMandatory(mandatory => !mandatory);
                  }}
                  aria-label="Mandatory"
                  icon={isMandatory ? <MdFavorite color="red" /> : <MdFavoriteBorder />}
                />
              </Tooltip>
              <Tooltip label="Update the leave" aria-label="Edit Leave">
                <Link to={routes.editLeave(leave.id)}>
                  <IconButton size="sm" ml={1} aria-label="Edit Leave" icon={<FiEdit />} />
                </Link>
              </Tooltip>
              <Tooltip label="Delete the leave" aria-label="Delete Leave">
                <IconButton
                  ml={1}
                  size="sm"
                  aria-label="Delete"
                  onClick={e => {
                    e.preventDefault();
                    return handleModalOpen(leave.id);
                  }}
                  icon={<AiOutlineDelete />}
                />
              </Tooltip>
            </Flex>
          </Flex>
          <Text display={['none', 'none', 'block']}>{leave.description}</Text>
          <Flex justify="space-between">
            {/* <Text fontSize={["sm", "md"]}>9 days ago</Text> */}
          </Flex>
        </Stack>
      </Box>
    </Link>
  );
}

export default LeaveCard;
