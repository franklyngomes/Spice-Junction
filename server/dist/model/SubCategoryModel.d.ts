import mongoose from "mongoose";
import Joi from "joi";
declare const SubCategorySchemaJoi: Joi.ObjectSchema<any>;
declare const SubCategoryModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    image: string;
    items: mongoose.Types.DocumentArray<{
        id?: string | null;
        name?: string | null;
        description?: string | null;
        image?: string | null;
        price?: number | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        id?: string | null;
        name?: string | null;
        description?: string | null;
        image?: string | null;
        price?: number | null;
    }> & {
        id?: string | null;
        name?: string | null;
        description?: string | null;
        image?: string | null;
        price?: number | null;
    }>;
    category: mongoose.Types.ObjectId[];
    name?: string | null;
    categoryNo?: string | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    image: string;
    items: mongoose.Types.DocumentArray<{
        id?: string | null;
        name?: string | null;
        description?: string | null;
        image?: string | null;
        price?: number | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        id?: string | null;
        name?: string | null;
        description?: string | null;
        image?: string | null;
        price?: number | null;
    }> & {
        id?: string | null;
        name?: string | null;
        description?: string | null;
        image?: string | null;
        price?: number | null;
    }>;
    category: mongoose.Types.ObjectId[];
    name?: string | null;
    categoryNo?: string | null;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    image: string;
    items: mongoose.Types.DocumentArray<{
        id?: string | null;
        name?: string | null;
        description?: string | null;
        image?: string | null;
        price?: number | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        id?: string | null;
        name?: string | null;
        description?: string | null;
        image?: string | null;
        price?: number | null;
    }> & {
        id?: string | null;
        name?: string | null;
        description?: string | null;
        image?: string | null;
        price?: number | null;
    }>;
    category: mongoose.Types.ObjectId[];
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
    items: mongoose.Types.DocumentArray<{
        id?: string | null;
        name?: string | null;
        description?: string | null;
        image?: string | null;
        price?: number | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        id?: string | null;
        name?: string | null;
        description?: string | null;
        image?: string | null;
        price?: number | null;
    }> & {
        id?: string | null;
        name?: string | null;
        description?: string | null;
        image?: string | null;
        price?: number | null;
    }>;
    category: mongoose.Types.ObjectId[];
    name?: string | null;
    categoryNo?: string | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    image: string;
    items: mongoose.Types.DocumentArray<{
        id?: string | null;
        name?: string | null;
        description?: string | null;
        image?: string | null;
        price?: number | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        id?: string | null;
        name?: string | null;
        description?: string | null;
        image?: string | null;
        price?: number | null;
    }> & {
        id?: string | null;
        name?: string | null;
        description?: string | null;
        image?: string | null;
        price?: number | null;
    }>;
    category: mongoose.Types.ObjectId[];
    name?: string | null;
    categoryNo?: string | null;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    image: string;
    items: mongoose.Types.DocumentArray<{
        id?: string | null;
        name?: string | null;
        description?: string | null;
        image?: string | null;
        price?: number | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        id?: string | null;
        name?: string | null;
        description?: string | null;
        image?: string | null;
        price?: number | null;
    }> & {
        id?: string | null;
        name?: string | null;
        description?: string | null;
        image?: string | null;
        price?: number | null;
    }>;
    category: mongoose.Types.ObjectId[];
    name?: string | null;
    categoryNo?: string | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export { SubCategoryModel, SubCategorySchemaJoi };
//# sourceMappingURL=SubCategoryModel.d.ts.map