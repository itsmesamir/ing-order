import { MinimalUser } from './User';

export enum LeaveTypeEnum {
  SICK = 'SICK',
  CASUAL = 'CASUAL',
  ANNUAL = 'ANNUAL',
  UNPAID = 'UNPAID',
}

export enum LeaveStatusEnum {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELED = 'CANCELED',
}

export interface Leave {
  id: number;
  description: string;
  date: string;
  status: LeaveStatusEnum;
  type: LeaveTypeEnum;
  createdAt?: string;
  updatedAt?: string;
}

export interface LeaveRequest {
  id: number;
  name: string;
  status: string;
  user: MinimalUser;
  startDate: string;
  endDate: string;
}
