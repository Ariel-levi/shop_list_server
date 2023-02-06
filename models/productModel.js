const mongoose = require("mongoose");
const Joi = require("joi");

let productScheam = new mongoose.Schema({
  name: String,
  info: String,
  img_url: String,
  date_created: {
    type: Date,
    default: Date.now(),
  },
  // amount of the product
  qty: {
    type: Number,
    default: 1,
  },
  in_cart: {
    type: Boolean,
    default: false,
  },
});

exports.ProductModel = mongoose.model("products", productScheam);

exports.validateProduct = (_bodyReq) => {
  let joiSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    info: Joi.string().min(3).max(100).allow(null, ""),
    img_url: Joi.string().min(3).max(500).allow(null, ""),
    qty: Joi.number().min(1).max(9999).allow(null, ""),
    in_cart: Joi.boolean().allow(null, ""),
  });
  return joiSchema.validate(_bodyReq);
};
