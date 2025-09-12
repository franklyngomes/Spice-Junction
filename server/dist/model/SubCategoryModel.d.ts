import mongoose from "mongoose";
import Joi from "joi";
declare const SubCategorySchemaJoi: Joi.ObjectSchema<any>;
declare const SubCategoryModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    image: string;
    category: mongoose.Types.ObjectId[];
    items: mongoose.Types.ObjectId[];
    name?: string | null;
    categoryNo?: string | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    image: string;
    category: mongoose.Types.ObjectId[];
    items: mongoose.Types.ObjectId[];
    name?: string | null;
    categoryNo?: string | null;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    image: string;
    category: mongoose.Types.ObjectId[];
    items: mongoose.Types.ObjectId[];
    name?: string | null;
    categoryNo?: string | null;
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
    image: string;
    category: mongoose.Types.ObjectId[];
    items: mongoose.Types.ObjectId[];
    name?: string | null;
    categoryNo?: string | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    image: string;
    category: mongoose.Types.ObjectId[];
    items: mongoose.Types.ObjectId[];
    name?: string | null;
    categoryNo?: string | null;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    image: string;
    category: mongoose.Types.ObjectId[];
    items: mongoose.Types.ObjectId[];
    name?: string | null;
    categoryNo?: string | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export { SubCategoryModel, SubCategorySchemaJoi };
//# sourceMappingURL=SubCategoryModel.d.ts.map