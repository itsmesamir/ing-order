import { PageParams } from './pagination';

export interface OrderFilter extends PageParams {
  cafeIds?: number[];
  menuItemIds?: number[];
  userIds?: number[];
}
