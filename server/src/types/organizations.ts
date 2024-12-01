import { PageParams } from './pagination';

export interface OrganizationFilter extends PageParams {
  userIds?: number[];
  name?: string;
}
