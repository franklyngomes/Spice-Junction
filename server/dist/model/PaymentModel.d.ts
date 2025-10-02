import mongoose from "mongoose";
import Joi from "joi";
declare const PaymentSchemaJoi: Joi.ObjectSchema<any>;
declare const PaymentModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    restaurant: mongoose.Types.ObjectId;
    date: NativeDate;
    status: "success" | "pending" | "failed";
    order: mongoose.Types.ObjectId;
    amount?: number | null;
    transactionId?: string | null;
    method?: string | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    restaurant: mongoose.Types.ObjectId;
    date: NativeDate;
    status: "success" | "pending" | "failed";
    order: mongoose.Types.ObjectId;
    amount?: number | null;
    transactionId?: string | null;
    method?: string | null;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    restaurant: mongoose.Types.ObjectId;
    date: NativeDate;
    status: "success" | "pending" | "failed";
    order: mongoose.Types.ObjectId;
    amount?: number | null;
    transactionId?: string | null;
    method?: string | null;
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
    date: NativeDate;
    status: "success" | "pending" | "failed";
    order: mongoose.Types.ObjectId;
    amount?: number | null;
    transactionId?: string | null;
    method?: string | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    restaurant: mongoose.Types.ObjectId;
    date: NativeDate;
    status: "success" | "pending" | "failed";
    order: mongoose.Types.ObjectId;
    amount?: number | null;
    transactionId?: string | null;
    method?: string | null;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    restaurant: mongoose.Types.ObjectId;
    date: NativeDate;
    status: "success" | "pending" | "failed";
    order: mongoose.Types.ObjectId;
    amount?: number | null;
    transactionId?: string | null;
    method?: string | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export { PaymentModel, PaymentSchemaJoi };
//# sourceMappingURL=PaymentModel.d.ts.map