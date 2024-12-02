import { PageParams } from './pagination';

export interface EventFilter extends PageParams {
  userIds?: number[];
  name?: string;
  eventIds?: number[];
  startDate?: string;
  endDate?: string;
  organizationIds?: number[];
  eventDate?: string;
}
