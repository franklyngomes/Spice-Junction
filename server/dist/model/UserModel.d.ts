import mongoose from "mongoose";
import Joi from "joi";
declare const UserSchemaJoi: Joi.ObjectSchema<any>;
declare const UserModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    role: string;
    address: mongoose.Types.DocumentArray<{
        buildingNo?: string | null;
        street?: string | null;
        city?: string | null;
        pinCode?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        buildingNo?: string | null;
        street?: string | null;
        city?: string | null;
        pinCode?: string | null;
    }> & {
        buildingNo?: string | null;
        street?: string | null;
        city?: string | null;
        pinCode?: string | null;
    }>;
    verified: boolean;
    isBlocked: boolean;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    password?: string | null;
    phone?: string | null;
    verificationToken?: string | null;
    refreshToken?: string | null;
    verificationTokenExpires?: string | null;
    forgotPasswordCode?: string | null;
    forgotPasswordCodeValidation?: number | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    role: string;
    address: mongoose.Types.DocumentArray<{
        buildingNo?: string | null;
        street?: string | null;
        city?: string | null;
        pinCode?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        buildingNo?: string | null;
        street?: string | null;
        city?: string | null;
        pinCode?: string | null;
    }> & {
        buildingNo?: string | null;
        street?: string | null;
        city?: string | null;
        pinCode?: string | null;
    }>;
    verified: boolean;
    isBlocked: boolean;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    password?: string | null;
    phone?: string | null;
    verificationToken?: string | null;
    refreshToken?: string | null;
    verificationTokenExpires?: string | null;
    forgotPasswordCode?: string | null;
    forgotPasswordCodeValidation?: number | null;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    role: string;
    address: mongoose.Types.DocumentArray<{
        buildingNo?: string | null;
        street?: string | null;
        city?: string | null;
        pinCode?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        buildingNo?: string | null;
        street?: string | null;
        city?: string | null;
        pinCode?: string | null;
    }> & {
        buildingNo?: string | null;
        street?: string | null;
        city?: string | null;
        pinCode?: string | null;
    }>;
    verified: boolean;
    isBlocked: boolean;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    password?: string | null;
    phone?: string | null;
    verificationToken?: string | null;
    refreshToken?: string | null;
    verificationTokenExpires?: string | null;
    forgotPasswordCode?: string | null;
    forgotPasswordCodeValidation?: number | null;
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
    role: string;
    address: mongoose.Types.DocumentArray<{
        buildingNo?: string | null;
        street?: string | null;
        city?: string | null;
        pinCode?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        buildingNo?: string | null;
        street?: string | null;
        city?: string | null;
        pinCode?: string | null;
    }> & {
        buildingNo?: string | null;
        street?: string | null;
        city?: string | null;
        pinCode?: string | null;
    }>;
    verified: boolean;
    isBlocked: boolean;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    password?: string | null;
    phone?: string | null;
    verificationToken?: string | null;
    refreshToken?: string | null;
    verificationTokenExpires?: string | null;
    forgotPasswordCode?: string | null;
    forgotPasswordCodeValidation?: number | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    role: string;
    address: mongoose.Types.DocumentArray<{
        buildingNo?: string | null;
        street?: string | null;
        city?: string | null;
        pinCode?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        buildingNo?: string | null;
        street?: string | null;
        city?: string | null;
        pinCode?: string | null;
    }> & {
        buildingNo?: string | null;
        street?: string | null;
        city?: string | null;
        pinCode?: string | null;
    }>;
    verified: boolean;
    isBlocked: boolean;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    password?: string | null;
    phone?: string | null;
    verificationToken?: string | null;
    refreshToken?: string | null;
    verificationTokenExpires?: string | null;
    forgotPasswordCode?: string | null;
    forgotPasswordCodeValidation?: number | null;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    role: string;
    address: mongoose.Types.DocumentArray<{
        buildingNo?: string | null;
        street?: string | null;
        city?: string | null;
        pinCode?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        buildingNo?: string | null;
        street?: string | null;
        city?: string | null;
        pinCode?: string | null;
    }> & {
        buildingNo?: string | null;
        street?: string | null;
        city?: string | null;
        pinCode?: string | null;
    }>;
    verified: boolean;
    isBlocked: boolean;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    password?: string | null;
    phone?: string | null;
    verificationToken?: string | null;
    refreshToken?: string | null;
    verificationTokenExpires?: string | null;
    forgotPasswordCode?: string | null;
    forgotPasswordCodeValidation?: number | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export { UserModel, UserSchemaJoi };
//# sourceMappingURL=UserModel.d.ts.map