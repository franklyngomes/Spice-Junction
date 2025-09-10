import mongoose from "mongoose";
import Joi from "joi";
declare const BlogSchemaJoi: Joi.ObjectSchema<any>;
declare const SubCategoryModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    description?: string | null;
    title?: string | null;
    image?: string | null;
    author?: mongoose.Types.ObjectId | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    description?: string | null;
    title?: string | null;
    image?: string | null;
    author?: mongoose.Types.ObjectId | null;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    description?: string | null;
    title?: string | null;
    image?: string | null;
    author?: mongoose.Types.ObjectId | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    description?: string | null;
    title?: string | null;
    image?: string | null;
    author?: mongoose.Types.ObjectId | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    description?: string | null;
    title?: string | null;
    image?: string | null;
    author?: mongoose.Types.ObjectId | null;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    description?: string | null;
    title?: string | null;
    image?: string | null;
    author?: mongoose.Types.ObjectId | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export { SubCategoryModel, BlogSchemaJoi };
//# sourceMappingURL=BlogModel.d.ts.map