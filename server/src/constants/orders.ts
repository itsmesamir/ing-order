import { OrderItemStatusEnum, OrderStatusEnum } from '@/types/common';

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

export const VALID_ORDER_ITEM_STATUS_UPDATE: Record<OrderItemStatusEnum, OrderItemStatusEnum[]> = {
  [OrderItemStatusEnum.Pending]: [
    OrderItemStatusEnum.Preparing,
    OrderItemStatusEnum.Ready,
    OrderItemStatusEnum.Completed,
    OrderItemStatusEnum.Cancelled,
  ],
  [OrderItemStatusEnum.Preparing]: [
    OrderItemStatusEnum.Ready,
    OrderItemStatusEnum.Completed,
    OrderItemStatusEnum.Cancelled,
  ],
  [OrderItemStatusEnum.Ready]: [OrderItemStatusEnum.Completed, OrderItemStatusEnum.Cancelled],
  [OrderItemStatusEnum.Completed]: [],
  [OrderItemStatusEnum.Cancelled]: [],
};
