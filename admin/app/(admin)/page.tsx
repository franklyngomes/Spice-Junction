import type { Metadata } from "next";
import { EcommerceMetrics } from "../../components/ecommerce/EcommerceMetrics";
import React from "react";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";

export const metadata: Metadata = {
  title:
    "Spice Junction | Deliciousness Delivered To Your Door",
  description: "Spice Junction Admin Panel",
};

export default function Ecommerce() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <EcommerceMetrics />

      </div>
      <div className="col-span-12 xl:col-span-5">
        <MonthlySalesChart />
      </div>

      <div className="col-span-12">
        <StatisticsChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
      </div>
    </div>
  );
}
