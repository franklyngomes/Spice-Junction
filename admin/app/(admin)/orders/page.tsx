"use client"
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import BasicTable from "../../../components/tables/BasicTable";
import React from "react";
import Button from "../../../components/ui/button/Button";
import { ChevronDownIcon } from "../../../icons";
import { useModal } from "../../../hooks/useModal";
import { Modal } from "../../../components/ui/modal";
import Label from "../../../components/form/Label";
import Select from "../../../components/form/Select";
import { useForm, Controller } from "react-hook-form";
import { useStore } from "../../../store/store";
import toast from "react-hot-toast";
import { format } from 'date-fns';
import Badge from "../../../components/ui/badge/Badge";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Cookies } from "react-cookie";
import { OrderDetailsQuery, RestaurantOrderQuery, UpdateOrderQuery } from "../../../api/query/OrderQuery";

interface OrderFormProps {
  status?: string;
}
interface foodItem {
  foodItem: {
    _id: string,
    name: string
  },
  quantity: number
  _id: string
}
interface OrderTableItem {
  orderNo: string;
  firstName: string;
  lastName: string;
  items: foodItem[];
  amount: number;
  status: string;
  payment: string;
  date: Date;
}
const Orders = () => {
  const schema = yup.object({
    status: yup.string()
  });

  const cookies = new Cookies()
  const restaurant = cookies.get("restaurant")
  const { data: orderList } = RestaurantOrderQuery(restaurant, !!restaurant)
  const orders = orderList?.data
  const { isOpen, openModal, closeModal } = useModal();
  const { handleSubmit, reset, control, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const { editId, isEditing, setIsEditing } = useStore();
  const { data: details } = OrderDetailsQuery(editId, !!editId)
  const orderDetails = details?.data
  const { mutateAsync: update } = UpdateOrderQuery()

  const tableColumns = [
    { label: "Order No.", key: "orderNo" },
    {
      label: "Date", key: "date", render: (item: OrderTableItem) => item.date ? format(new Date(item.date), "dd-MM-yyyy") : "---"
    },
    { label: "First Name", key: "customerId.firstName" },
    { label: "Last Name", key: "customerId.lastName" },
    {
      label: "Items", key: "items", render: (order: OrderTableItem) =>
        order.items && order.items.length > 0 ? (
          <div className="space-y-1">
            {order.items.map((it: foodItem) => (
              <div key={it._id}>
                {it.foodItem?.name || "Unknown"} × {it.quantity}
              </div>
            ))}
          </div>
        ) : (
          "---"
        )
    },
    { label: "Amount(₹)", key: "amount" },
    {
      label: "Status",
      key: "status",
      render: (item: OrderTableItem) => (
        <Badge
          size="sm"
          color={
            item.status === "Pending Payment"
              ? "warning"
              : item.status === "Out for delivery"
                ? "success"
                : item.status === "Preparing" ? "info"
                  : item.status === "Delivered"
                    ? "success"
                    : "warning"
          }
        >
          {item.status}
        </Badge>
      )
    },
    {
      label: "Payment", key: "", render: (item: OrderTableItem) => (
        <Badge
          size="sm"
          color={
            item.payment === "Pending"
              ? "warning"
              : item.payment === "Success"
                ? "success"
                : "error"
          }
        >
          {item.payment}
        </Badge>
      )
    },
    { label: "Transaction Id", key: "transactionId" },

  ]
  const statusOptions = [
    {
      label: "Pending Payment",
      value: "Pending Payment",
    },
    {
      label: "Preparing",
      value: "Preparing"
    },
    {
      label: "Out for delivery",
      value: "Out for delivery"
    },
    {
      label: "Delivered",
      value: "Delivered"
    },
  ]
  const onUpdate = (data: OrderFormProps) => {
    const { status } = data;

    const payload = {
      status
    };
    update({ editId, payload }, {
      onSuccess: (res) => {
        if (res.error) {
          toast.error(res.message);
          return;
        }
        setIsEditing(false)
        closeModal()
        toast.success(res?.message);
      },
    })
  }

  React.useEffect(() => {
    if (isEditing) {
      openModal()
    }
  }, [isEditing, openModal])

  // useEffect to reset form values when editing
  React.useEffect(() => {
    if (isEditing && orderDetails) {
      reset({
        status: orderDetails.status,
      });
    } else {
      reset({
        status: "",
      })
    }
  }, [isEditing, orderDetails, reset]);
  return (
    <>
      <div>
        <div className="flex flex-wrap justify-between items-center">
          <PageBreadcrumb pageTitle="Orders" breadCrumbTitle="Orders" />
        </div>
        <div className="space-y-6 mt-5">
         {/* @ts-expect-error ignore*/}
          <BasicTable data={orders} tableColumns={tableColumns} />
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={() => {
        setIsEditing(false)
        closeModal()
        reset()
      }} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-2xl bg-white p-5 dark:bg-gray-900">
          <div className="px-2 pr-14">
            <h4 className="mb-5 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Update Order
            </h4>
          </div>
          <form className="flex flex-col" onSubmit={handleSubmit(onUpdate)}>
            <div className="custom-scrollbar h-auto overflow-y-auto px-2 pb-3">
              <div>
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  {isEditing &&
                    <div>
                      <Label>Change Status</Label>
                      <div className="relative">
                        <>
                          <Controller
                            control={control}
                            name="status"
                            render={({ field }) => (
                              <Select
                                {...field}
                                value={field.value ?? ""}
                                options={statusOptions}
                                placeholder="Select Status"
                                className="dark:bg-dark-900"
                              />
                            )}
                          />
                          <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                            <ChevronDownIcon />
                          </span>
                        </>
                      </div>
                      {errors.status && (
                        <p style={{ color: "red", margin: "0", padding: "5px" }}>
                          {errors.status.message}
                        </p>
                      )}
                    </div>
                  }
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={() => {
                setIsEditing(false)
                closeModal()
                reset()
              }}>
                Cancel
              </Button>
              <Button size="sm" type="submit">
                {isEditing ? "Save" : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  )
}

export default Orders