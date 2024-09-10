import React from 'react';
import { Badge } from '@chakra-ui/react';

import ActionModal from 'components/common/actionModal';

import { classNames } from 'utils/className';

import { User } from 'types/User';
import { CellData, RowData } from 'types/common';

export function ActionCell(
  { row: { original } }: { row: { original: RowData<User> } },
  ActionOption: (requestData: RowData<User>) => CellData[]
) {
  const option = ActionOption(original);

  return <ActionModal cellData={option} rowData={original} />;
}

export function TextCell(value?: string | number, className?: string) {
  return <span className={classNames('', className)}>{value || '-'}</span>;
}

export function RoleCell(user: User, className = '') {
  const { roles } = user;

  return (
    <div className={`employee__role ${className}`} id={`user-role-${user}`}>
      {roles?.length > 0
        ? roles.map(role => {
            return (
              <Badge key={role.id} colorScheme="primary" m={1}>
                {role.name}
              </Badge>
            );
          })
        : '-'}
    </div>
  );
}
