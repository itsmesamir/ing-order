import { OrderStatusEnum } from '@/types/common';

export const VALID_ORDER_STATUS_UPDATE: Record<OrderStatusEnum, OrderStatusEnum[]> = {
  [OrderStatusEnum.Pending]: [
    OrderStatusEnum.Preparing,
    OrderStatusEnum.Ready,
    OrderStatusEnum.Completed,
    OrderStatusEnum.Cancelled,
  ],
  [OrderStatusEnum.Preparing]: [
    OrderStatusEnum.Ready,
    OrderStatusEnum.Completed,
    OrderStatusEnum.Cancelled,
  ],
  [OrderStatusEnum.Ready]: [OrderStatusEnum.Completed, OrderStatusEnum.Cancelled],
  [OrderStatusEnum.Completed]: [],
  [OrderStatusEnum.Cancelled]: [],
};
