import { HttpCode } from "../helper/HttpCode.js";
import { DeliveryZoneModel } from "../model/DeliveryZoneModel.js";
import axios from "axios";
class DeliveryZoneController {
    async createDeliveryZone(req, res) {
        const { zoneName, district } = req.body;
        try {
            const ifExists = await DeliveryZoneModel.find({ zoneName: { $eq: zoneName } });
            if (ifExists && ifExists.length !== 0) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: "This zone already exists!"
                });
            }
            const response = await axios.get(`https://api.postalpincode.in/postoffice/${zoneName}`);
            const result = response.data[0]?.PostOffice.filter((po) => po.District === district);
            if (!result || result.length === 0) {
                return res.status(404).json({
                    status: false,
                    message: "No pincodes found for the specified zone",
                });
            }
            const pincodes = Array.from(new Set(result.map((po) => po.Pincode)));
            const newZone = new DeliveryZoneModel({
                zoneName,
                pinCodeList: pincodes,
            });
            if (result) {
                newZone.district = await result[0]?.District;
                newZone.division = await result[0]?.Division;
                newZone.state = await result[0]?.State;
            }
            await newZone.save();
            return res.status(201).json({
                status: true,
                message: "Delivery zone created with pincodes",
                data: newZone,
            });
        }
        catch (error) {
            return res.status(HttpCode.serverError).json({
                status: false,
                message: error.message,
            });
        }
    }
    async getAllDeliveryZones(req, res) {
        try {
            const zones = await DeliveryZoneModel.find();
            if (!zones || zones.length === 0) {
                return res.status(HttpCode.notFound).json({
                    status: false,
                    message: "No delivery zone found!"
                });
            }
            return res.status(HttpCode.success).json({
                status: false,
                message: "Delivery zones fetched successfully",
                data: zones
            });
        }
        catch (error) {
            return res.status(HttpCode.serverError).json({
                status: false,
                message: error.message,
            });
        }
    }
    async getDeliveryZoneDetails(req, res) {
        try {
            const id = req.params.id;
            const zone = await DeliveryZoneModel.findById(id);
            if (!zone) {
                return res.status(HttpCode.notFound).json({
                    status: false,
                    message: "No Delivery Zone found!"
                });
            }
            return res.status(HttpCode.success).json({
                status: false,
                message: "Delivery zone fetched successfully",
                data: zone
            });
        }
        catch (error) {
            return res.status(HttpCode.serverError).json({
                status: false,
                message: error.message,
            });
        }
    }
    async deleteDeliveryZone(req, res) {
        try {
            const id = req.params.id;
            const zone = await DeliveryZoneModel.findByIdAndDelete(id);
            if (!zone) {
                return res.status(HttpCode.notFound).json({
                    status: false,
                    message: "No Delivery Zone found!"
                });
            }
            return res.status(HttpCode.success).json({
                status: false,
                message: "Delivery deleted successfully",
            });
        }
        catch (error) {
            return res.status(HttpCode.serverError).json({
                status: false,
                message: error.message,
            });
        }
    }
}
export default new DeliveryZoneController();
//# sourceMappingURL=DeliveryZoneController.js.map