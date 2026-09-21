import joi from "joi";

export const productSchema = joi.object({
  title: joi.string().required().messages({
    "string.base": "Should be a string",
    "any.required": "Title should not be empty",
  }),
  author: joi.string().required().messages({
    "string.base": "Should be a string",
    "any.required": "Author should not be empty",
  }),
  price: joi.number().positive().required().messages({
    "number.base": "Should be a numbers",
    "number.positive": "Price must be greater then 0",
    "any.required": "Price should not be empty",
  }),
  rating: joi.number().min(0).max(5).messages({
    "number.base": "Rating should be a number",
    "number.min": "Rating cannot be less than 0",
    "number.max": "Rating cannot be greater than 5",
  }),
  purchase: joi.number().messages({
    "number.base": "Should be a numbers",
  }),
  keyword: joi.array().items(joi.string()).required().messages({
    "array.base": "Keywords should be an array",
    "array.empty": "Keywords cannot be empty",
    "string.base": "Each keyword should be a string",
  }),
  image: joi.string().messages({
    "string.base": "Should be a string",
  }),
  bestseller: joi.boolean().messages({
    "boolean.base": "Should be a boolean",
  }),
  wishlist: joi.boolean().messages({
    "boolean.base": "Should be a boolean",
  }),
});

//export const productsSchemas = joi.array().items(productSchemas);

export const cartSchema = joi.object({
  productid: joi
    .string()
    .length(24)
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.base": "Should be an Product ID",
      "string.empty": "Product ID Should Not Be Empty",
      "string.length": "Invalid Product ID",
      "string.pattern.base": "Invalid Product ID",
      "any.required": "Product ID Should Not Be Empty",
    }),
});

export const cartPatchSchema = joi.object({
  quantitychange: joi.number().valid(-1, 1).required().messages({
    "number.base": "Quantity change should be a number",
    "any.only": "Quantity change must be either 1 or -1",
    "any.required": "Quantity change is required",
  }),
});

export const usersRegisterSchema = joi.object({
  firstname:joi.string().required(),
  lastname:joi.string().required(),
  email:joi.string().required(),
  password:joi.string().required(),
})

export const usersLoginSchema = joi.object({
  email:joi.string().required(),
  password:joi.string().required(),
})