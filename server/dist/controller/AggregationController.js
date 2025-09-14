import { HttpCode } from "../helper/HttpCode.js";
import { CategoryModel } from "../model/CategoryModel.js";
import { SubCategoryModel } from "../model/SubCategoryModel.js";
import { FoodItemModel } from "../model/FoodItemModel.js";
import { RestaurantModel } from "../model/ResturantModel.js";
class AggregationController {
    async GlobalSearch(req, res) {
        try {
            const { searchTerm } = req.body;
            const categories = await CategoryModel.find({ $text: { $search: searchTerm } });
            const subCategories = await SubCategoryModel.find({ $text: { $search: searchTerm } });
            const dishes = await FoodItemModel.find({ $text: { $search: searchTerm } });
            const restaurants = await RestaurantModel.find({ $text: { $search: searchTerm } });
            if (!categories && !subCategories && !dishes && !restaurants) {
                return res.status(HttpCode.notFound).json({
                    status: false,
                    message: "No results found! Try something else."
                });
            }
            return res.status(HttpCode.success).json({
                status: true,
                message: "Results fetched successfully!",
                categories,
                subCategories,
                dishes,
                restaurants,
            });
        }
        catch (error) {
            return res.status(HttpCode.serverError).json({
                status: false,
                message: error?.message
            });
        }
    }
}
export default new AggregationController();
//# sourceMappingURL=AggregationController.js.map