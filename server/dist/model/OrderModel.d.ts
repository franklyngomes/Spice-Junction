import mongoose from "mongoose";
import Joi from "joi";
declare const OrderSchemaJoi: Joi.ObjectSchema<any>;
declare const OrderModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    customerId: mongoose.Types.ObjectId;
    items: mongoose.Types.DocumentArray<{
        foodItem: mongoose.Types.ObjectId;
        quantity: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        foodItem: mongoose.Types.ObjectId;
        quantity: number;
    }> & {
        foodItem: mongoose.Types.ObjectId;
        quantity: number;
    }>;
    discount: number;
    deliveryCharge: number;
    status: "pending" | "preparing" | "out_for_delivery" | "delivered";
    restaurant?: mongoose.Types.ObjectId | null;
    tax?: {
        packaging: number;
        restaurantGST: number;
        platform: number;
    } | null;
    amount?: number | null;
    address?: {
        buildingNo?: string | null;
        street?: string | null;
        city?: string | null;
        pinCode?: string | null;
    } | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    customerId: mongoose.Types.ObjectId;
    items: mongoose.Types.DocumentArray<{
        foodItem: mongoose.Types.ObjectId;
        quantity: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        foodItem: mongoose.Types.ObjectId;
        quantity: number;
    }> & {
        foodItem: mongoose.Types.ObjectId;
        quantity: number;
    }>;
    discount: number;
    deliveryCharge: number;
    status: "pending" | "preparing" | "out_for_delivery" | "delivered";
    restaurant?: mongoose.Types.ObjectId | null;
    tax?: {
        packaging: number;
        restaurantGST: number;
        platform: number;
    } | null;
    amount?: number | null;
    address?: {
        buildingNo?: string | null;
        street?: string | null;
        city?: string | null;
        pinCode?: string | null;
    } | null;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    customerId: mongoose.Types.ObjectId;
    items: mongoose.Types.DocumentArray<{
        foodItem: mongoose.Types.ObjectId;
        quantity: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        foodItem: mongoose.Types.ObjectId;
        quantity: number;
    }> & {
        foodItem: mongoose.Types.ObjectId;
        quantity: number;
    }>;
    discount: number;
    deliveryCharge: number;
    status: "pending" | "preparing" | "out_for_delivery" | "delivered";
    restaurant?: mongoose.Types.ObjectId | null;
    tax?: {
        packaging: number;
        restaurantGST: number;
        platform: number;
    } | null;
    amount?: number | null;
    address?: {
        buildingNo?: string | null;
        street?: string | null;
        city?: string | null;
        pinCode?: string | null;
    } | null;
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
    customerId: mongoose.Types.ObjectId;
    items: mongoose.Types.DocumentArray<{
        foodItem: mongoose.Types.ObjectId;
        quantity: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        foodItem: mongoose.Types.ObjectId;
        quantity: number;
    }> & {
        foodItem: mongoose.Types.ObjectId;
        quantity: number;
    }>;
    discount: number;
    deliveryCharge: number;
    status: "pending" | "preparing" | "out_for_delivery" | "delivered";
    restaurant?: mongoose.Types.ObjectId | null;
    tax?: {
        packaging: number;
        restaurantGST: number;
        platform: number;
    } | null;
    amount?: number | null;
    address?: {
        buildingNo?: string | null;
        street?: string | null;
        city?: string | null;
        pinCode?: string | null;
    } | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    customerId: mongoose.Types.ObjectId;
    items: mongoose.Types.DocumentArray<{
        foodItem: mongoose.Types.ObjectId;
        quantity: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        foodItem: mongoose.Types.ObjectId;
        quantity: number;
    }> & {
        foodItem: mongoose.Types.ObjectId;
        quantity: number;
    }>;
    discount: number;
    deliveryCharge: number;
    status: "pending" | "preparing" | "out_for_delivery" | "delivered";
    restaurant?: mongoose.Types.ObjectId | null;
    tax?: {
        packaging: number;
        restaurantGST: number;
        platform: number;
    } | null;
    amount?: number | null;
    address?: {
        buildingNo?: string | null;
        street?: string | null;
        city?: string | null;
        pinCode?: string | null;
    } | null;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    customerId: mongoose.Types.ObjectId;
    items: mongoose.Types.DocumentArray<{
        foodItem: mongoose.Types.ObjectId;
        quantity: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        foodItem: mongoose.Types.ObjectId;
        quantity: number;
    }> & {
        foodItem: mongoose.Types.ObjectId;
        quantity: number;
    }>;
    discount: number;
    deliveryCharge: number;
    status: "pending" | "preparing" | "out_for_delivery" | "delivered";
    restaurant?: mongoose.Types.ObjectId | null;
    tax?: {
        packaging: number;
        restaurantGST: number;
        platform: number;
    } | null;
    amount?: number | null;
    address?: {
        buildingNo?: string | null;
        street?: string | null;
        city?: string | null;
        pinCode?: string | null;
    } | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export { OrderModel, OrderSchemaJoi };
//# sourceMappingURL=OrderModel.d.ts.map