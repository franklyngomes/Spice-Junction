import mongoose from "mongoose";
import Joi from "joi";
declare const DeliveryZoneSchemaJoi: Joi.ObjectSchema<any>;
declare const DeliveryZoneModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    pinCodeList: string[];
    city?: string | null;
    zoneName?: string | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    pinCodeList: string[];
    city?: string | null;
    zoneName?: string | null;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    pinCodeList: string[];
    city?: string | null;
    zoneName?: string | null;
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
    pinCodeList: string[];
    city?: string | null;
    zoneName?: string | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    pinCodeList: string[];
    city?: string | null;
    zoneName?: string | null;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    pinCodeList: string[];
    city?: string | null;
    zoneName?: string | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export { DeliveryZoneModel, DeliveryZoneSchemaJoi };
//# sourceMappingURL=DeliveryZoneModel.d.ts.map