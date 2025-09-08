import mongoose from "mongoose";
import Joi from "joi";
declare const PaymentSchemaJoi: Joi.ObjectSchema<any>;
declare const PaymentModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    status: "pending" | "success" | "failed";
    order: mongoose.Types.ObjectId;
    transactionId: string;
    date?: NativeDate | null;
    amount?: number | null;
    method?: "COD" | "card" | "upi" | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    status: "pending" | "success" | "failed";
    order: mongoose.Types.ObjectId;
    transactionId: string;
    date?: NativeDate | null;
    amount?: number | null;
    method?: "COD" | "card" | "upi" | null;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    status: "pending" | "success" | "failed";
    order: mongoose.Types.ObjectId;
    transactionId: string;
    date?: NativeDate | null;
    amount?: number | null;
    method?: "COD" | "card" | "upi" | null;
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
    status: "pending" | "success" | "failed";
    order: mongoose.Types.ObjectId;
    transactionId: string;
    date?: NativeDate | null;
    amount?: number | null;
    method?: "COD" | "card" | "upi" | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    status: "pending" | "success" | "failed";
    order: mongoose.Types.ObjectId;
    transactionId: string;
    date?: NativeDate | null;
    amount?: number | null;
    method?: "COD" | "card" | "upi" | null;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    status: "pending" | "success" | "failed";
    order: mongoose.Types.ObjectId;
    transactionId: string;
    date?: NativeDate | null;
    amount?: number | null;
    method?: "COD" | "card" | "upi" | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export { PaymentModel, PaymentSchemaJoi };
//# sourceMappingURL=PaymentModel.d.ts.map