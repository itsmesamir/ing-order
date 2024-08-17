import { Designation, Role } from './common';

export interface MinimalUser {
  id: number;
  name: string;
  email: string;
}
export interface User {
  id: number;
  name: string;
  email: string;
  country: string;
  countryId?: number;
  department: string;
  designationId?: number;
  designation?: Designation;
  manager?: MinimalUser;
  phone: string;
  roles: Role[];
  imageUrl: string;
}
