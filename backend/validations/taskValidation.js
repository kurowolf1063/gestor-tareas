const Joi = require('joi');

const taskSchema = Joi.object({
  title: Joi.string().required(),
  dueDate: Joi.date().greater('now').required(),
  priority: Joi.string().valid('alta', 'media', 'baja').optional(),
  status: Joi.string().valid('pendiente', 'completado').optional()
});

function validateTask(data) {
  const { error, value } = taskSchema.validate(data);
  if (error) {
    const err = new Error(error.details.map(d => d.message).join(', '));
    err.status = 400;
    throw err;
  }
  return value;
}

module.exports = { validateTask };
