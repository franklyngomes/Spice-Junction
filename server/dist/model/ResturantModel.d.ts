import mongoose from "mongoose";
import Joi from "joi";
declare const RestaurantSchemaJoi: Joi.ObjectSchema<any>;
declare const RestaurantModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    isBlocked: boolean;
    ownerId: mongoose.Types.ObjectId;
    deliveryZone: mongoose.Types.ObjectId[];
    cuisine: string[];
    isApproved: boolean;
    phone?: string | null;
    name?: string | null;
    address?: {
        street?: string | null;
        city?: string | null;
        pinCode?: string | null;
        buildingNo?: string | null;
    } | null;
    image?: string | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    isBlocked: boolean;
    ownerId: mongoose.Types.ObjectId;
    deliveryZone: mongoose.Types.ObjectId[];
    cuisine: string[];
    isApproved: boolean;
    phone?: string | null;
    name?: string | null;
    address?: {
        street?: string | null;
        city?: string | null;
        pinCode?: string | null;
        buildingNo?: string | null;
    } | null;
    image?: string | null;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    isBlocked: boolean;
    ownerId: mongoose.Types.ObjectId;
    deliveryZone: mongoose.Types.ObjectId[];
    cuisine: string[];
    isApproved: boolean;
    phone?: string | null;
    name?: string | null;
    address?: {
        street?: string | null;
        city?: string | null;
        pinCode?: string | null;
        buildingNo?: string | null;
    } | null;
    image?: string | null;
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
    isBlocked: boolean;
    ownerId: mongoose.Types.ObjectId;
    deliveryZone: mongoose.Types.ObjectId[];
    cuisine: string[];
    isApproved: boolean;
    phone?: string | null;
    name?: string | null;
    address?: {
        street?: string | null;
        city?: string | null;
        pinCode?: string | null;
        buildingNo?: string | null;
    } | null;
    image?: string | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    isBlocked: boolean;
    ownerId: mongoose.Types.ObjectId;
    deliveryZone: mongoose.Types.ObjectId[];
    cuisine: string[];
    isApproved: boolean;
    phone?: string | null;
    name?: string | null;
    address?: {
        street?: string | null;
        city?: string | null;
        pinCode?: string | null;
        buildingNo?: string | null;
    } | null;
    image?: string | null;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    isBlocked: boolean;
    ownerId: mongoose.Types.ObjectId;
    deliveryZone: mongoose.Types.ObjectId[];
    cuisine: string[];
    isApproved: boolean;
    phone?: string | null;
    name?: string | null;
    address?: {
        street?: string | null;
        city?: string | null;
        pinCode?: string | null;
        buildingNo?: string | null;
    } | null;
    image?: string | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export { RestaurantModel, RestaurantSchemaJoi };
//# sourceMappingURL=ResturantModel.d.ts.map