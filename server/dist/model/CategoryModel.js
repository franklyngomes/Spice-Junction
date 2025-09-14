import mongoose from "mongoose";
const Schema = mongoose.Schema;
import Joi from "joi";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 6);
const CategorySchemaJoi = Joi.object({
    name: Joi.string()
        .min(3)
        .max(20)
        .required()
        .messages({ "any.required": "Name cannot be empty!" }),
    items: Joi.array().items({
        name: Joi.string(),
        description: Joi.string(),
        subCategory: Joi.string(),
        price: Joi.number(),
        image: Joi.string(),
    }),
});
const CategorySchema = new Schema({
    name: {
        type: String,
    },
    categoryId: {
        type: String,
        unique: true,
    },
    items: [
        {
            id: {
                type: String,
            },
            name: {
                type: String,
            },
            description: {
                type: String,
            },
            subCategory: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "sub_category",
            },
            price: {
                type: Number,
            },
            image: {
                type: String,
            },
        },
    ],
}, { timestamps: true });
CategorySchema.pre("validate", async function (next) {
    if (!this.categoryId) {
        this.categoryId = `CAT-${nanoid()}`;
    }
});
const CategoryModel = mongoose.model("category", CategorySchema);
export { CategoryModel, CategorySchemaJoi };
//# sourceMappingURL=CategoryModel.js.map