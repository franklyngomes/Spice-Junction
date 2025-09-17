import mongoose from "mongoose";
import Joi from "joi";
declare const BlogSchemaJoi: Joi.ObjectSchema<any>;
declare const BlogModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    image: string;
    title?: string | null;
    author?: mongoose.Types.ObjectId | null;
    description?: string | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    image: string;
    title?: string | null;
    author?: mongoose.Types.ObjectId | null;
    description?: string | null;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    image: string;
    title?: string | null;
    author?: mongoose.Types.ObjectId | null;
    description?: string | null;
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
    title?: string | null;
    author?: mongoose.Types.ObjectId | null;
    description?: string | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    image: string;
    title?: string | null;
    author?: mongoose.Types.ObjectId | null;
    description?: string | null;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    image: string;
    title?: string | null;
    author?: mongoose.Types.ObjectId | null;
    description?: string | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export { BlogModel, BlogSchemaJoi };
//# sourceMappingURL=BlogModel.d.ts.map