Table Users {
  id INT [pk, increment]
  username VARCHAR(50) [not null, unique]
  email VARCHAR(255) [unique, not null]
  password_hash VARCHAR(255) [not null]
  first_name VARCHAR(255)
  last_name VARCHAR(255)
  is_active BOOLEAN [default: true]
  created_at TIMESTAMP [not null, default: `CURRENT_TIMESTAMP`]
  updated_at TIMESTAMP [not null, default: `CURRENT_TIMESTAMP`]
  deleted_at TIMESTAMP
  created_by BIGINT [ref: > Users.id]
  deleted_by BIGINT [ref: > Users.id]
  updated_by BIGINT [ref: > Users.id]
}

Table Roles {
  id INT [pk, increment]
  name VARCHAR(50) [not null, unique]
  description TEXT
  is_active BOOLEAN [default: true]
  created_at TIMESTAMP [not null, default: `CURRENT_TIMESTAMP`]
  updated_at TIMESTAMP [not null, default: `CURRENT_TIMESTAMP`]
  deleted_at TIMESTAMP
  created_by BIGINT [ref: > Users.id]
  deleted_by BIGINT [ref: > Users.id]
  updated_by BIGINT [ref: > Users.id]
}

Table Permissions {
  id INT [pk, increment]
  name VARCHAR(50) [not null, unique]
  description TEXT
  is_active BOOLEAN [default: true]
  created_at TIMESTAMP [not null, default: `CURRENT_TIMESTAMP`]
  updated_at TIMESTAMP [not null, default: `CURRENT_TIMESTAMP`]
  deleted_at TIMESTAMP
  created_by BIGINT [ref: > Users.id]
  deleted_by BIGINT [ref: > Users.id]
  updated_by BIGINT [ref: > Users.id]
}

Table UserRoles {
  user_id INT [ref: > Users.id]
  role_id INT [ref: > Roles.id]
  PRIMARY KEY (user_id, role_id)
}

Table RolePermissions {
  role_permission_id INT [pk, increment]
  role_id INT [ref: > Roles.id]
  permission_id INT [ref: > Permissions.id]
}

Table Groups {
  id INT [pk, increment]
  name VARCHAR(50) [not null, unique]
  description TEXT
  is_active BOOLEAN [default: true]
  created_at TIMESTAMP [not null, default: `CURRENT_TIMESTAMP`]
  updated_at TIMESTAMP [not null, default: `CURRENT_TIMESTAMP`]
  deleted_at TIMESTAMP
  created_by BIGINT [ref: > Users.id]
  deleted_by BIGINT [ref: > Users.id]
  updated_by BIGINT [ref: > Users.id]
}

Table UserGroups {
  id INT [pk, increment]
  group_name VARCHAR(255) [unique, not null]
  description TEXT
  is_active BOOLEAN [default: true]
  created_at TIMESTAMP [not null, default: `CURRENT_TIMESTAMP`]
  updated_at TIMESTAMP [not null, default: `CURRENT_TIMESTAMP`]
  deleted_at TIMESTAMP
  created_by BIGINT [ref: > Users.id]
  deleted_by BIGINT [ref: > Users.id]
  updated_by BIGINT [ref: > Users.id]
}

Table UserGroupMemberships {
  membership_id INT [pk, increment]
  user_id INT [ref: > Users.id]
  group_id INT [ref: > UserGroups.id]
}

Table Colleges {
  id INT [pk, increment]
  name VARCHAR(255) [not null]
  address TEXT
  created_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
  updated_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}

Table Cafes {
  id INT [pk, increment]
  college_id INT [ref: > Colleges.id]
  name VARCHAR(255) [not null]
  location VARCHAR(255)
  created_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
  updated_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}

Table MenuCategories {
  id INT [pk, increment]
  parent_id INT
  category_name VARCHAR(255) [unique, not null]
}

Table MenuItems {
  id INT [pk, increment]
  cafe_id INT [ref: > Cafes.id]
  category_id INT [ref: > MenuCategories.id]
  name VARCHAR(255) [not null]
  description TEXT
  price DECIMAL(10, 2) [not null]
  max_order INT [default: 0]
  prepared_time INT [default: 0]
  availability BOOLEAN [default: true]
  discount DECIMAL(5, 2) [default: 0.00]
  is_special BOOLEAN [default: false]
  status ENUM('Available', 'NotAvailable', 'ComingSoon') [default: 'Available']
  created_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
  updated_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}

Table Orders {
  id INT [pk, increment]
  user_id INT [ref: > Users.id]
  cafe_id INT [ref: > Cafes.id]
  total_price DECIMAL(10, 2) [not null]
  created_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
  updated_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}

Table OrderStatus {
  id INT [pk, increment]
  order_id INT [ref: > Orders.id]
  status ENUM('Pending', 'Preparing', 'Ready', 'Completed', 'Cancelled') [not null]
  updated_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
  updated_by INT [ref: > Users.id]
}


Table OrderItems {
  id INT [pk, increment]
  order_id INT [ref: > Orders.id]
  item_id INT [ref: > MenuItems.id]
  quantity INT [not null]
  price DECIMAL(10, 2) [not null]
  discount DECIMAL(5, 2) [default: 0.00]
  created_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
  updated_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}

Table Payments {
  id INT [pk, increment]
  order_id INT [ref: > Orders.id]
  amount DECIMAL(10, 2) [not null]
  payment_method ENUM('CreditCard', 'DigitalWallet') [not null]
  transaction_id VARCHAR(255) [unique, not null]
  created_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
  updated_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}

Table PaymentStatus {
  id INT [pk, increment]
  payment_id INT [ref: > Payments.id]
  status ENUM('Pending', 'Completed', 'Failed') [not null]
  changed_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
  changed_by INT [ref: > Users.id]
}


Table Notifications {
  id INT [pk, increment]
  user_id INT [ref: > Users.id]
  order_id INT [ref: > Orders.id]
  message TEXT [not null]
  type ENUM('OrderStatus', 'Payment', 'General') [not null]
  status ENUM('Unread', 'Read') [default: 'Unread']
  created_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
  updated_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}

Table Reviews {
  id INT [pk, increment]
  user_id INT [ref: > Users.id]
  cafe_id INT [ref: > Cafes.id]
  menu_item_id INT [ref: > MenuItems.id]
  rating INT [not null]
  comment TEXT
  created_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
  updated_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}

Table Analytics {
  id INT [pk, increment]
  cafe_id INT [ref: > Cafes.id]
  date DATE [not null]
  order_count INT [default: 0]
  total_sales DECIMAL(10, 2) [default: 0.00]
  created_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
  updated_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}