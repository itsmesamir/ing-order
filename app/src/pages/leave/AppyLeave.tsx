/* eslint-disable react/jsx-props-no-spreading */
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  VStack,
  Container,
  Box,
  Text,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

import { createLeaveRequest } from 'services/leaveRequest';

import DashboardLayout from 'components/DashboardLayout';
import { notify } from 'components/Toast';
import Loading from 'components/common/Loading';

import { useLeaveTypesQuery } from 'hooks/useLeaveTypesQuery';
import { useFiscalYearsQuery } from 'hooks/useFiscalYearsQuery';
import { useCurrentUserQuery } from 'hooks/useCurrentUserQuery';

import { getDifferenceBetweenDates } from 'utils/date';
import { handleError } from 'utils/handleError';
import { getCurrentFiscalYear } from 'utils/fiscalYears';

import { FiscalYear } from 'types/common';

import routes from 'constants/routes';

interface ApplyLeaveFormValues {
  startDate: string;
  endDate: string;
  leaveType?: string;
  reason: string;
  fiscalYearId?: number;
  leaveTypeId: number;
  userId: number;
  leaveDays: number;
}

function ApplyLeave() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<ApplyLeaveFormValues>();

  const history = useHistory();

  const formStartDate = watch('startDate');

  const leaveTypesQuery = useLeaveTypesQuery({});
  const { isLoading: isLoadingLeaveTypes, data: leaveTypes = [] } = leaveTypesQuery;

  const { isLoading: isLoadingFiscalYears, data: fiscalYears = [] } = useFiscalYearsQuery({});

  const {
    isLoading: isLoadingCurrentUser,
    isError: isErrorCurrentUser,
    data: currentUser,
  } = useCurrentUserQuery();

  const onSubmit: SubmitHandler<ApplyLeaveFormValues> = async formData => {
    const { startDate, endDate, reason, leaveType } = formData;
    const leaveDays = getDifferenceBetweenDates(startDate, endDate, 'days');

    const userId = currentUser?.id;

    const fiscalYear = getCurrentFiscalYear(fiscalYears);

    if (!fiscalYear?.id) {
      notify({
        type: 'danger',
        data: { title: 'Error', message: 'Fiscal year not found' },
      });
    }

    const data = {
      startDate,
      endDate,
      reason,
      userId,
      fiscalYearId: (fiscalYear as FiscalYear).id,
      leaveTypeId: parseInt(leaveType as string, 10),
      leaveDays: leaveDays + 1,
    };

    try {
      await createLeaveRequest(data);

      notify({
        type: 'success',
        data: { title: 'Success', message: 'Leave request applied successfully' },
      });
      history.push(routes.leave);
    } catch (error) {
      handleError(error);
    }
  };

  const isDataLoading = isLoadingLeaveTypes || isLoadingFiscalYears || isLoadingCurrentUser;

  return (
    <DashboardLayout bgColor="gray.80">
      <Container maxW="6xl" px={4}>
        <Text as="h1" fontWeight="bold" py={4}>
          Apply Leave
        </Text>

        {isDataLoading && <Loading />}

        {!isDataLoading && (
          <Box bgColor="white" padding={8} boxShadow="md" borderRadius="md">
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing={6} align="flex-start">
                <FormControl id="leaveType" isInvalid={!!errors.leaveType}>
                  <FormLabel>Leave Type</FormLabel>
                  <Controller
                    name="leaveType"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Leave type is required' }}
                    render={({ field }) => (
                      <Select {...field} placeholder="Select leave type">
                        {leaveTypes.map(option => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </Select>
                    )}
                  />
                  <FormErrorMessage>
                    {errors.leaveType && errors.leaveType.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl id="startDate" isInvalid={!!errors.startDate}>
                  <FormLabel>Starting Date</FormLabel>
                  <Controller
                    name="startDate"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Starting date is required' }}
                    render={({ field }) => <Input {...field} type="date" />}
                  />
                  <FormErrorMessage>
                    {errors.startDate && errors.startDate.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl id="endDate" isInvalid={!!errors.endDate}>
                  <FormLabel>Ending Date</FormLabel>
                  <Controller
                    name="endDate"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: 'Ending date is required',
                      validate: value =>
                        value >= formStartDate || 'End date must be after or equal to start date',
                    }}
                    render={({ field }) => <Input {...field} type="date" />}
                  />
                  <FormErrorMessage>{errors.endDate && errors.endDate.message}</FormErrorMessage>
                </FormControl>
                <FormControl id="reason" isInvalid={!!errors.reason}>
                  <FormLabel>Reason</FormLabel>
                  <Controller
                    name="reason"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Reason is required' }}
                    render={({ field }) => <Textarea {...field} />}
                  />
                  <FormErrorMessage>{errors.reason && errors.reason.message}</FormErrorMessage>
                </FormControl>
                <Box>
                  <Button
                    type="button"
                    mx={2}
                    colorScheme="gray"
                    onClick={() => history.push(routes.leave)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" colorScheme="purple">
                    Submit
                  </Button>
                </Box>
              </VStack>
            </form>
          </Box>
        )}
      </Container>
    </DashboardLayout>
  );
}

export default ApplyLeave;
