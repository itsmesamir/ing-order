import React from 'react';

import { OrderStatusEnum } from 'types/common';

import { colors } from 'presets/ingPresets';

// Color mapping for order statuses
const statusColors: Record<OrderStatusEnum, string> = {
  // [OrderStatusEnum.Pending]: colors.warning.base, // Warning color
  // [OrderStatusEnum.Preparing]: colors.primary[600], // Primary color
  // [OrderStatusEnum.Ready]: colors.secondary.DEFAULT, // Secondary color
  // [OrderStatusEnum.Completed]: colors.success.base, // Success color
  // [OrderStatusEnum.Cancelled]: colors.error.base, // Error color

  [OrderStatusEnum.Pending]: '#FFA500', // Orange
  [OrderStatusEnum.Preparing]: '#1E90FF', // Dodger Blue
  [OrderStatusEnum.Ready]: '#32CD32', // Lime Green
  [OrderStatusEnum.Completed]: '#008000', // Green
  [OrderStatusEnum.Cancelled]: '#FF0000', // Red
};

// Props for the component
interface OrderStatusProps {
  status: OrderStatusEnum;
}

function OrderStatusColor(props: OrderStatusProps) {
  const { status } = props;

  return (
    <span className="flex items-center text-base">
      <span
        className="h-3 w-3 rounded-full inline-block mr-2"
        style={{
          backgroundColor: statusColors[status],
          color: colors.white.DEFAULT,
        }}
      />
      {status}
    </span>
  );
}

export default OrderStatusColor;
