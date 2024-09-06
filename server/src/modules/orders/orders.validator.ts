import Joi from 'joi';

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

export default {
  fetch,
};
