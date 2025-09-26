import mongoose from "mongoose";
import Joi from "joi";
declare const CategorySchemaJoi: Joi.ObjectSchema<any>;
declare const CategoryModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    items: mongoose.Types.DocumentArray<{
        id?: string | null;
        name?: string | null;
        description?: string | null;
        image?: string | null;
        subCategory?: mongoose.Types.ObjectId | null;
        price?: number | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        id?: string | null;
        name?: string | null;
        description?: string | null;
        image?: string | null;
        subCategory?: mongoose.Types.ObjectId | null;
        price?: number | null;
    }> & {
        id?: string | null;
        name?: string | null;
        description?: string | null;
        image?: string | null;
        subCategory?: mongoose.Types.ObjectId | null;
        price?: number | null;
    }>;
    name?: string | null;
    categoryId?: string | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    items: mongoose.Types.DocumentArray<{
        id?: string | null;
        name?: string | null;
        description?: string | null;
        image?: string | null;
        subCategory?: mongoose.Types.ObjectId | null;
        price?: number | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        id?: string | null;
        name?: string | null;
        description?: string | null;
        image?: string | null;
        subCategory?: mongoose.Types.ObjectId | null;
        price?: number | null;
    }> & {
        id?: string | null;
        name?: string | null;
        description?: string | null;
        image?: string | null;
        subCategory?: mongoose.Types.ObjectId | null;
        price?: number | null;
    }>;
    name?: string | null;
    categoryId?: string | null;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    items: mongoose.Types.DocumentArray<{
        id?: string | null;
        name?: string | null;
        description?: string | null;
        image?: string | null;
        subCategory?: mongoose.Types.ObjectId | null;
        price?: number | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        id?: string | null;
        name?: string | null;
        description?: string | null;
        image?: string | null;
        subCategory?: mongoose.Types.ObjectId | null;
        price?: number | null;
    }> & {
        id?: string | null;
        name?: string | null;
        description?: string | null;
        image?: string | null;
        subCategory?: mongoose.Types.ObjectId | null;
        price?: number | null;
    }>;
    name?: string | null;
    categoryId?: string | null;
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
    items: mongoose.Types.DocumentArray<{
        id?: string | null;
        name?: string | null;
        description?: string | null;
        image?: string | null;
        subCategory?: mongoose.Types.ObjectId | null;
        price?: number | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        id?: string | null;
        name?: string | null;
        description?: string | null;
        image?: string | null;
        subCategory?: mongoose.Types.ObjectId | null;
        price?: number | null;
    }> & {
        id?: string | null;
        name?: string | null;
        description?: string | null;
        image?: string | null;
        subCategory?: mongoose.Types.ObjectId | null;
        price?: number | null;
    }>;
    name?: string | null;
    categoryId?: string | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    items: mongoose.Types.DocumentArray<{
        id?: string | null;
        name?: string | null;
        description?: string | null;
        image?: string | null;
        subCategory?: mongoose.Types.ObjectId | null;
        price?: number | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        id?: string | null;
        name?: string | null;
        description?: string | null;
        image?: string | null;
        subCategory?: mongoose.Types.ObjectId | null;
        price?: number | null;
    }> & {
        id?: string | null;
        name?: string | null;
        description?: string | null;
        image?: string | null;
        subCategory?: mongoose.Types.ObjectId | null;
        price?: number | null;
    }>;
    name?: string | null;
    categoryId?: string | null;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    items: mongoose.Types.DocumentArray<{
        id?: string | null;
        name?: string | null;
        description?: string | null;
        image?: string | null;
        subCategory?: mongoose.Types.ObjectId | null;
        price?: number | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        id?: string | null;
        name?: string | null;
        description?: string | null;
        image?: string | null;
        subCategory?: mongoose.Types.ObjectId | null;
        price?: number | null;
    }> & {
        id?: string | null;
        name?: string | null;
        description?: string | null;
        image?: string | null;
        subCategory?: mongoose.Types.ObjectId | null;
        price?: number | null;
    }>;
    name?: string | null;
    categoryId?: string | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export { CategoryModel, CategorySchemaJoi };
//# sourceMappingURL=CategoryModel.d.ts.map