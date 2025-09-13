import mongoose from "mongoose";
import Joi from "joi";
declare const FoodItemSchemaJoi: Joi.ObjectSchema<any>;
declare const FoodItemModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    restaurant: mongoose.Types.ObjectId;
    subCategory: mongoose.Types.ObjectId;
    menu: mongoose.Types.ObjectId;
    isAvailable: boolean;
    name?: string | null;
    description?: string | null;
    image?: string | null;
    price?: number | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    restaurant: mongoose.Types.ObjectId;
    subCategory: mongoose.Types.ObjectId;
    menu: mongoose.Types.ObjectId;
    isAvailable: boolean;
    name?: string | null;
    description?: string | null;
    image?: string | null;
    price?: number | null;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    restaurant: mongoose.Types.ObjectId;
    subCategory: mongoose.Types.ObjectId;
    menu: mongoose.Types.ObjectId;
    isAvailable: boolean;
    name?: string | null;
    description?: string | null;
    image?: string | null;
    price?: number | null;
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
    restaurant: mongoose.Types.ObjectId;
    subCategory: mongoose.Types.ObjectId;
    menu: mongoose.Types.ObjectId;
    isAvailable: boolean;
    name?: string | null;
    description?: string | null;
    image?: string | null;
    price?: number | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    restaurant: mongoose.Types.ObjectId;
    subCategory: mongoose.Types.ObjectId;
    menu: mongoose.Types.ObjectId;
    isAvailable: boolean;
    name?: string | null;
    description?: string | null;
    image?: string | null;
    price?: number | null;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    restaurant: mongoose.Types.ObjectId;
    subCategory: mongoose.Types.ObjectId;
    menu: mongoose.Types.ObjectId;
    isAvailable: boolean;
    name?: string | null;
    description?: string | null;
    image?: string | null;
    price?: number | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export { FoodItemModel, FoodItemSchemaJoi };
//# sourceMappingURL=FoodItemModel.d.ts.map