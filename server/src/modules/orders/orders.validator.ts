import Joi from 'joi';

import { OrderItemStatusEnum, OrderStatusEnum } from '@/types/common';

import { paginationSchema } from '@/schemas/pagination';

const commaSeparatedNumbers = (fieldName: string) =>
  Joi.string()
    .pattern(/^[0-9]+(,[0-9]+)*$/, 'comma-separated numbers')
    .optional()
    .custom((value, helpers) => {
      const values = value.split(',').map(Number);

      if (values.some(isNaN)) {
        return helpers.error('any.invalid'); // Custom error key
      }

      return values;
    })
    .messages({
      'string.pattern.name': `${fieldName} must be a comma-separated list of numbers`,
      'any.invalid': `${fieldName} contains invalid numbers`,
    });

export const fetchSchema = Joi.object({
  cafeIds: commaSeparatedNumbers('cafeIds'),
  menuItemIds: commaSeparatedNumbers('menuItemIds'),
  userIds: commaSeparatedNumbers('userIds'),
});

// Combine pagination schema with fetch schema using Joi.concat
export const fetch = fetchSchema.concat(paginationSchema);

// Define the Joi schema for a single order item
const orderItemSchema = Joi.object({
  id: Joi.number().required(), // Validate id as a number
  status: Joi.string()
    .valid(...Object.values(OrderItemStatusEnum)) // Use spread operator to pass enum values individually
    .required(), // Ensure status is one of the defined enum values
});

// Joi schema for validating the order data
export const orderValidationSchema = Joi.object({
  orderStatus: Joi.string()
    .valid(...Object.values(OrderStatusEnum)) // Use spread operator to pass enum values individually
    .optional(), // Ensure orderStatus is one of the defined enum values
  orderItems: Joi.array().items(orderItemSchema).optional(), // Validate the orderItem array
});
