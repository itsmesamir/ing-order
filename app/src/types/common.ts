// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Any = any;

export interface CustomError {
  message: string;
  status: number;
}

export interface FilterOption {
  id?: number;
  label: string;
  value: string;
}

export interface Role {
  id: number;
  name: string;
}

export enum Roles {
  ADMIN = 'Admin',
  USER = 'User',
  MANAGER = 'Manager',
}

export interface Designation {
  id: number;
  name: string;
}

export interface Country {
  id: number;
  name: string;
}

export interface LeaveType {
  id: number;
  name: string;
}

export interface LeaveCredit {
  id: number;
  leaveTypeId?: number;
  leaveType: {
    id: number;
    name: string;
  };
  userId: number;
  leaveDays: number;
  takenDays: number;
  createdAt: Date;
  createdBy: number;
  updatedAt: Date;
  updatedBy: number;
}

export interface FiscalYear {
  id: number;
  startDate: string;
  endDate: string;
  countryId: number;
}

export interface DefaultObject {
  [key: string]: Any;
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
  name: string;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
}
export interface MenuUnit {
  id: number;
  name: string;
  symbol: string;
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
  category?: MenuCategory;
  unitId: number;
  unit?: MenuUnit;
  name: string;
  description: string;
  price: number;
  rating: number;
  imageUrl: string;
  maxOrder: number;
  preparedTime: number;
  availability: number;
  discount: number;
  isSpecial: boolean;
  status: MenuItemStatusEnum;
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

export enum OrderItemStatusEnum {
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
  userId: number;
  name?: string;
  cafeId: number;
  cafeName: string;
  cafeLocation: string;
  totalPrice: number;
  status: OrderStatusEnum;
  items: OrderItem[];
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
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
  itemId?: number;
  menu?: MenuItem;
  quantity: number;
  price: number;
  discount: number;
  imageUrl?: string;
  createdAt?: string;
  createdBy?: number;
  updatedAt?: string;
  updatedBy?: number;
}

export type CartItem = Omit<OrderItem, 'id'>;

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

export interface CellData {
  name: string;
  className?: string;
  icon?: JSX.Element;
  state: React.Dispatch<React.SetStateAction<unknown>>;
}

export interface RowData<T> {
  row: { index: number; original: T };
}
