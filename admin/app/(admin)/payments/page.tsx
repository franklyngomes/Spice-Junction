"use client"
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import BasicTable from "../../../components/tables/BasicTable";
import React from "react";
import { format } from 'date-fns';
import Badge from "../../../components/ui/badge/Badge";
import { Cookies } from "react-cookie";
import { RestaurantPaymentQuery } from "../../../api/query/PaymentQuery";

interface PaymentTableItem {
amount: number
createdAt: string
date: string
method: string
order: string
restaurant:string
status: string
transactionId: string
updatedAt: string
__v: 0
_id: string
}
const Payments = () => {

  const cookies = new Cookies()
  const restaurant = cookies.get("restaurant")
  const { data: paymentList } = RestaurantPaymentQuery(restaurant, !!restaurant)
  const payments = paymentList?.data

  const tableColumns = [
    { label: "Transaction Id", key: "transactionId" },
    {
      label: "Date", key: "date", render: (item: PaymentTableItem) => item.date ? format(new Date(item.date), "dd-MM-yyyy") : "---"
    },
    { label: "Payment Method", key: "method" },
    { label: "Amount(₹)", key: "amount" },
    {
      label: "Status", key: "status", render: (item: PaymentTableItem) => (
        <Badge
          size="sm"
          color={
            item.status === "pending"
              ? "warning"
              : item.status === "success"
                ? "success"
                : "error"
          }
        >
          {item.status}
        </Badge>
      )
    },
  ]
  return (
    <>
      <div>
        <div className="flex flex-wrap justify-between items-center">
          <PageBreadcrumb pageTitle="Payments" breadCrumbTitle="Payments" />
        </div>
        <div className="space-y-6 mt-5">
          {/* @ts-expect-error ignore*/}
          <BasicTable data={payments} tableColumns={tableColumns} />
        </div>
      </div>
    </>
  )
}

export default Payments