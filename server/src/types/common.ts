import { User } from './user';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Any = any;

export interface Designation {
  id: number;
  name: string;
}

export interface Role {
  id: number;
  name: string;
}

export interface UserRole {
  id: number;
  name: string;
  userId: number;
  userRoleId: number;
}
export interface DefaultObject {
  [key: string]: Any;
}

export enum Roles {
  ADMIN = 'Admin',
  USER = 'User',
  MANAGER = 'Manager',
}

export interface Country {
  id: number;
  name: string;
}

export interface FiscalYear {
  id: number;
  name: string;
  isCurrent: boolean;
}

export interface Group {
  id: number;
  name: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  created_by?: number;
  deleted_by?: number;
  updated_by?: number;
}

export interface UserGroup {
  id: number;
  group_name: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  created_by?: number;
  deleted_by?: number;
  updated_by?: number;
}

export interface UserGroupMembership {
  membership_id: number;
  user_id: number;
  group_id: number;
}

export interface College {
  id: number;
  name: string;
  address: string;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
}

export interface Cafe {
  id: number;
  collegeId: number;
  name: string;
  location: string;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
}

export interface MenuCategory {
  id: number;
  parentId: number;
  categoryName: string;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
}

export enum MenuItemStatusEnum {
  Available = 'Available',
  NotAvailable = 'NotAvailable',
  CommingSoon = 'CommingSoon',
}

export interface MenuItem {
  id: number;
  cafeId?: number;
  cafe?: Cafe;
  categoryId: number;
  name: string;
  quantity?: number;
  description: string;
  price: number;
  maxOrder: number;
  preparedTime: number;
  availability: number;
  discount: number;
  isSpecial: boolean;
  status: MenuItemStatusEnum;
  imageUrl: string;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
}

export enum OrderStatusEnum {
  Pending = 'Pending',
  Preparing = 'Preparing',
  Ready = 'Ready',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
}

export enum PaymentMethodEnum {
  CreditCard = 'CreditCard',
  DigitalWallet = 'DigitalWallet',
}

export enum PaymentStatusEnum {
  Pending = 'Pending',
  Completed = 'Completed',
  Failed = 'Failed',
}

export interface Order {
  id: number;
  user: User;
  transaction_id?: string;
  order_date: string;
  status: OrderStatusEnum;
  created_by: number;
  created_at: string;
  updated_by?: number;
  updated_at?: string;
  deleted_by?: number;
  deleted_at?: string;
  menu_items: MenuItem[];
}

export interface OrderStatus {
  id: number;
  orderId: number;
  status: OrderStatusEnum;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
}

export interface OrderItem {
  id: number;
  orderId: number;
  itemId: number;
  quantity: number;
  price: number;
  discount: number;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
}

export interface Payment {
  id: number;
  orderId: number;
  amount: number;
  paymentMethod: PaymentMethodEnum;
  transactionId: string;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
}

export interface PaymentStatus {
  id: number;
  paymentId: number;
  status: PaymentStatusEnum;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
}

export interface Review {
  id: number;
  paymentId: number;
  status: PaymentStatusEnum;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
}
