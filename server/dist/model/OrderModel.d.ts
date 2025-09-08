import mongoose from "mongoose";
import Joi from "joi";
declare const OrderSchemaJoi: Joi.ObjectSchema<any>;
declare const OrderModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    restaurant: mongoose.Types.ObjectId;
    quantity: number;
    customerId: mongoose.Types.ObjectId;
    deliveryCharge: number;
    status: "pending" | "preparing" | "out_for_delivery" | "delivered";
    address?: {
        street?: string | null;
        city?: string | null;
        pinCode?: string | null;
    } | null;
    discount?: number | null;
    tax?: {
        packaging: number;
        restaurantGST: number;
        platform: number;
    } | null;
    amount?: number | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    restaurant: mongoose.Types.ObjectId;
    quantity: number;
    customerId: mongoose.Types.ObjectId;
    deliveryCharge: number;
    status: "pending" | "preparing" | "out_for_delivery" | "delivered";
    address?: {
        street?: string | null;
        city?: string | null;
        pinCode?: string | null;
    } | null;
    discount?: number | null;
    tax?: {
        packaging: number;
        restaurantGST: number;
        platform: number;
    } | null;
    amount?: number | null;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    restaurant: mongoose.Types.ObjectId;
    quantity: number;
    customerId: mongoose.Types.ObjectId;
    deliveryCharge: number;
    status: "pending" | "preparing" | "out_for_delivery" | "delivered";
    address?: {
        street?: string | null;
        city?: string | null;
        pinCode?: string | null;
    } | null;
    discount?: number | null;
    tax?: {
        packaging: number;
        restaurantGST: number;
        platform: number;
    } | null;
    amount?: number | null;
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
    quantity: number;
    customerId: mongoose.Types.ObjectId;
    deliveryCharge: number;
    status: "pending" | "preparing" | "out_for_delivery" | "delivered";
    address?: {
        street?: string | null;
        city?: string | null;
        pinCode?: string | null;
    } | null;
    discount?: number | null;
    tax?: {
        packaging: number;
        restaurantGST: number;
        platform: number;
    } | null;
    amount?: number | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    restaurant: mongoose.Types.ObjectId;
    quantity: number;
    customerId: mongoose.Types.ObjectId;
    deliveryCharge: number;
    status: "pending" | "preparing" | "out_for_delivery" | "delivered";
    address?: {
        street?: string | null;
        city?: string | null;
        pinCode?: string | null;
    } | null;
    discount?: number | null;
    tax?: {
        packaging: number;
        restaurantGST: number;
        platform: number;
    } | null;
    amount?: number | null;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    restaurant: mongoose.Types.ObjectId;
    quantity: number;
    customerId: mongoose.Types.ObjectId;
    deliveryCharge: number;
    status: "pending" | "preparing" | "out_for_delivery" | "delivered";
    address?: {
        street?: string | null;
        city?: string | null;
        pinCode?: string | null;
    } | null;
    discount?: number | null;
    tax?: {
        packaging: number;
        restaurantGST: number;
        platform: number;
    } | null;
    amount?: number | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export { OrderModel, OrderSchemaJoi };
//# sourceMappingURL=OrderModel.d.ts.map