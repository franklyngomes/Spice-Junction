import mongoose from "mongoose";
const Schema = mongoose.Schema;
import Joi from "joi";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 6);
const SubCategorySchemaJoi = Joi.object({
    name: Joi.string().min(3).max(20).required().message('Name cannot be empty!'),
    image: Joi.string().required().message("Image is required!"),
});
const SubCategorySchema = new Schema({
    name: {
        type: String
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    categoryNo: {
        type: String,
        unique: true,
        default: () => nanoid()
    }
}, { timestamps: true });
SubCategorySchema.pre("validate", async function (next) {
    if (!this.categoryNo) {
        const prefix = this.name?.slice(0, 3).toUpperCase();
        this.categoryNo = `${prefix}-${nanoid()}`;
    }
});
const SubCategoryModel = mongoose.model('sub_category', SubCategorySchema);
export { SubCategoryModel, SubCategorySchemaJoi };
//# sourceMappingURL=SubCategoryModel.js.map