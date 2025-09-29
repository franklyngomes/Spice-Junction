"use client"
import React from 'react'
import { FoodMenuIcon, PencilIcon, TrashBinIcon } from '../../../icons'
import Button from "../../../components/ui/button/Button";
import PageBreadcrumb from '../../../components/common/PageBreadCrumb';
import { CreateFoodMenuQuery, DeleteFoodMenuQuery, FoodMenuDetailsQuery, RestaurantFoodMenuQuery, UpdateFoodMenuQuery } from '../../../api/query/FoodMenuQuery';
import { Modal } from '../../../components/ui/modal';
import { useStore } from '../../../store/store';
import Label from '../../../components/form/Label';
import { Controller, useForm } from 'react-hook-form';
import Input from '../../../components/form/input/InputField';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useModal } from '../../../hooks/useModal';
import { Cookies } from 'react-cookie';
import { FoodMenuData } from '../../../types/types';
import toast from 'react-hot-toast';

const schema = yup.object({
  name: yup.string().required("Name is required"),
  restaurant: yup.string().required("Restaurant is required")
});
const Menu = () => {
  const cookies = new Cookies()
  const { editId, isEditing, setIsEditing, setEditId } = useStore();
  const id = cookies.get("restaurantId")
  const { data } = RestaurantFoodMenuQuery(id, !!id)
  const food_menu = data?.data
  const { data: details } = FoodMenuDetailsQuery(editId, !!editId)
  const food_details = details?.data
  const { isOpen, openModal, closeModal } = useModal();
  const { handleSubmit, reset, control, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const { mutateAsync: create } = CreateFoodMenuQuery()
  const {mutateAsync: update} = UpdateFoodMenuQuery()
  const {mutateAsync: delete_food_menu} = DeleteFoodMenuQuery()

  const onSubmit = (data: FoodMenuData) => {
    const { name, restaurant } = data
    const payload = {
      name,
      restaurant
    }
    create(payload, {
      onSuccess: (res) => {
        if (res.error) {
          toast.error(res.message);
          return;
        }
        reset()
        toast.success(res?.message);
        closeModal()
      },
    })
  }
  const onUpdate = (data: FoodMenuData) => {
    const { name, restaurant } = data
    const payload = {
      name,
      restaurant
    }
    update({editId,payload}, {
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
  const onDelete = () => {
    const id = editId
    delete_food_menu(id, {
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
  React.useEffect(() => {
    if (isEditing && food_details) {
      reset({
        name: food_details.name,
        restaurant: id
      });
    } else {
      reset({
        name: "",
        restaurant: id
      })
    }
  }, [isEditing, food_details, reset]);
  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-4">
        <PageBreadcrumb pageTitle="Food Menu" breadCrumbTitle="Food Menu"/>
        <Button size="sm" variant="primary" startIcon={<FoodMenuIcon />} onClick={openModal}>
          Add Food Menu
        </Button>
      </div>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {
          food_menu?.map((item, index) => (
            <div className="col-span-12 sm:col-span-6 space-y-6 md:col-span-4" key={index}>
              <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.15]">
                <div className="flex items-end justify-between">
                  <h5 className="mt-2 font-bold text-gray-800 text-lg dark:text-white/90">
                    {item.name}
                  </h5>
                </div>

                <div className="flex items-end justify-between mt-5">
                  <div className="flex items-center justify-center w-20 h-12 bg-gray-100 rounded-xl dark:bg-gray-300">
                    {item?.items?.length} Items
                  </div>
                    <Button size="sm" variant="primary" endIcon={<PencilIcon />} onClick={() => {
                      setIsEditing(true)
                      setEditId(item._id)
                    }}>
                    </Button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <Modal isOpen={isOpen} onClose={() => {
        setIsEditing(false)
        closeModal()
        reset()
      }} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-2xl bg-white p-5 dark:bg-gray-900">
          <div className="px-2 pr-14">
            <h4 className="mb-5 text-2xl font-semibold text-gray-800 dark:text-white/90">
              {!isEditing ? "Add New Menu" : "Edit Menu"}
            </h4>
          </div>
          <form className="flex flex-col" onSubmit={isEditing ? handleSubmit(onUpdate) : handleSubmit(onSubmit)}>
            <div className="custom-scrollbar h-auto overflow-y-auto px-2 pb-3">
              <div>
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div>
                    <Label>Name</Label>
                    <div className="relative">
                      <Controller
                        control={control}
                        name="name"
                        render={({ field }) => (
                          <Input {...field}
                            value={field.value ?? ""}
                          />
                        )}
                      />
                      {errors.name && (
                        <p style={{ color: "red", margin: "0", padding: "5px" }}>
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label>Restaurant</Label>
                    <div className="relative">
                      <Controller
                        control={control}
                        name="restaurant"
                        render={({ field }) => (
                          <Input {...field}
                            value={id ?? ""}
                            type="string"
                            disabled
                          />
                        )}
                      />
                      {errors.restaurant && (
                        <p style={{ color: "red", margin: "0", padding: "5px" }}>
                          {errors.restaurant.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              {
                isEditing ? <Button size="sm" variant="outline" className='text-brand-500!' onClick={() => {
                setIsEditing(false)
                onDelete()
                closeModal()
                reset()
              }}>
                <TrashBinIcon/> Delete
              </Button> :
              <Button size="sm" variant="outline" onClick={() => {
                setIsEditing(false)
                closeModal()
                reset()
              }}>
                Cancel
              </Button>
            }
              <Button size="sm" type="submit">
                {isEditing ? "Save" : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default Menu