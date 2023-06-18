import Joi from "joi";

export const userSchema = Joi.object({
  email: Joi.string().email(),
  name: Joi.string(),
  phone_number: Joi.string(),
  password: Joi.string(),
});
