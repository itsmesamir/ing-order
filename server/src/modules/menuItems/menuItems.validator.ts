import Joi from 'joi';

const createMenuItemSchema = Joi.object({
  name: Joi.string().required(),
  categoryId: Joi.number().integer().required(),
  unitId: Joi.number().integer().required(),
  cafeId: Joi.number().integer().required(),
  description: Joi.string().allow('', null),
  maxOrder: Joi.number().integer().min(0).required(),
  preparedTime: Joi.number().integer().min(0).required(),
  availability: Joi.boolean().required(),
  status: Joi.string().valid('Available', 'NotAvailable', 'ComingSoon').required(),
  isSpecial: Joi.boolean().required(),
  price: Joi.number().positive().required(),
  discount: Joi.number().positive().max(100).allow('', null),
  createdBy: Joi.number().required(), // <-- Add this line to allow 'createdBy'
});

const updateMenuItemSchema = Joi.object({
  name: Joi.string(),
  categoryId: Joi.number().integer(),
  unitId: Joi.number().integer(),
  cafeId: Joi.number().integer(),
  description: Joi.string().allow('', null),
  maxOrder: Joi.number().integer().min(0),
  preparedTime: Joi.number().integer().min(0),
  availability: Joi.boolean(),
  status: Joi.string().valid('Available', 'NotAvailable', 'ComingSoon'),
  isSpecial: Joi.boolean(),
  price: Joi.number().positive(),
  discount: Joi.number().positive().max(100).allow('', null),
  updatedBy: Joi.number(), // <-- Add this line to allow 'updatedBy'
});

export { createMenuItemSchema, updateMenuItemSchema };
