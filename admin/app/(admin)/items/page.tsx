"use client"
import React from 'react'
import { ChevronDownIcon, FoodItemIcon, PencilIcon, RestaurantIcon, TrashBinIcon } from '../../../icons'
import Button from "../../../components/ui/button/Button";
import PageBreadcrumb from '../../../components/common/PageBreadCrumb';
import { RestaurantFoodMenuQuery } from '../../../api/query/FoodMenuQuery';
import { Modal } from '../../../components/ui/modal';
import { useStore } from '../../../store/store';
import Label from '../../../components/form/Label';
import { Controller, useForm } from 'react-hook-form';
import Input from '../../../components/form/input/InputField';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useModal } from '../../../hooks/useModal';
import { Cookies } from 'react-cookie';
import { FoodItemData } from '../../../types/types';
import toast from 'react-hot-toast';
import { CreateFoodItemQuery, DeleteFoodItemQuery, FoodItemDetailsQuery, RestaurantFoodItemQuery, UpdateFoodItemQuery } from '../../../api/query/FoodItemQuery';
import Image from 'next/image';
import { AllSubCategoryQuery } from '../../../api/query/SubCategoryQuery';
import Select from '../../../components/form/Select';
import FileInput from '../../../components/form/input/FileInput';
import TextArea from '../../../components/form/input/TextArea';
import Link from 'next/link';

const schema = yup.object({
  name: yup.string().min(6).max(50).required("Name is required"),
  description: yup.string().required("Description is required"),
  restaurant: yup.string().required("Restaurant Id is required"),
  subCategory: yup.string().required("Sub Category is required"),
  price: yup.number().required("Price is required"),
  menu: yup.string().required("Menu is required"),
  image: yup
    .mixed<File | string>()
    .test("file-or-url", "Image is required", (value) => {
      if (!value) return false;
      if (typeof value === "string") return value.trim().length > 0;
      if (value instanceof File) return value.size > 0;
      return false;
    }),
});
const Items = () => {
  const [subCategoryOption, setSubCategoryOption] = React.useState<{ label: string; value: string }[]>([])
  const [menuOption, setMenuOption] = React.useState<{ label: string; value: string }[]>([])
  const [isClient, setIsClient] = React.useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [image, setImage] = React.useState<File | null>(null)
  const [selectedMenu, setSelectedMenu] = React.useState("")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const cookies = new Cookies()
  const { editId, isEditing, setIsEditing, setEditId} = useStore();
  const restaurantId = cookies.get("restaurant")
  console.log(restaurantId)
  const { data } = RestaurantFoodItemQuery(restaurantId, !!restaurantId)
  const food_item = data?.data
  const { data: menu } = RestaurantFoodMenuQuery(restaurantId, !!restaurantId)
  const restaurant_menu = menu?.data
  const { data: subcategory } = AllSubCategoryQuery()
  const subcategories = subcategory?.data
  const { data: allMenu } = RestaurantFoodMenuQuery(restaurantId, !!restaurantId)
  const menus = allMenu?.data
  const { data: details } = FoodItemDetailsQuery(editId, !!editId)
  const food_details = details?.data
  const { isOpen, openModal, closeModal } = useModal();

  const { handleSubmit, reset, control, formState: { errors, isSubmitting } } = useForm({ resolver: yupResolver(schema) });
  const { mutateAsync: create, isPending: isCreating } = CreateFoodItemQuery()
  const { mutateAsync: update, isPending: isUpdating } = UpdateFoodItemQuery()
  const { mutateAsync: delete_food_item } = DeleteFoodItemQuery()
  const onSubmit = (data: FoodItemData) => {
    const { name, description, restaurant, subCategory, price, menu, image } = data
    const formdata = new FormData()
    formdata.append("name", name)
    formdata.append("description", description)
    formdata.append("restaurant", restaurant)
    formdata.append("subCategory", subCategory)
    formdata.append("price", price.toString())
    formdata.append("menu", menu)
    if (image instanceof File) {
      formdata.append("image", image);
    }
    create(formdata, {
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
  const onUpdate = (data: FoodItemData) => {
    const { name, description, restaurant, subCategory, price, menu, image } = data
    const formdata = new FormData()
    formdata.append("name", name)
    formdata.append("description", description)
    formdata.append("restaurant", restaurant)
    formdata.append("subCategory", subCategory)
    formdata.append("price", price.toString())
    formdata.append("menu", menu)
    if (image && image instanceof File) {
      formdata.append("image", image);
    } else {
      formdata.append("image", food_details?.image ?? "")
    }
    update({ editId, formdata }, {
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
    delete_food_item(id, {
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
  const handleSelectMenu = (id: string) => {
    setSelectedMenu(id)
    if (selectedMenu === id) {
      setSelectedMenu("")
    }
  }
  React.useEffect(() => {
    if (isEditing) {
      openModal()
    }
  }, [isEditing, openModal])
  React.useEffect(() => {
    setIsClient(true)
  }, [])
  React.useEffect(() => {
    if (subcategories && Array.isArray(subcategories)) {
      setSubCategoryOption(subcategories.map((itm) => ({ label: itm.name, value: itm._id })));
    }
    if (menus && Array.isArray(menus)) {
      setMenuOption(menus.map((itm) => ({ label: itm.name, value: itm._id })));
    }
  }, [subcategories, menus])
  React.useEffect(() => {
    if (isEditing && food_details) {
      reset({
        name: food_details.name,
        restaurant: restaurantId,
        description: food_details.description,
        price: food_details.price,
        image: food_details.image,
        menu: food_details.menu?._id,
        subCategory: food_details.subCategory?._id
      });
    } else {
      reset({
        name: "",
        description: "",
        price: 0,
        subCategory: "",
        menu: "",
        image: "",
        restaurant: restaurantId
      })
    }
  }, [isEditing, food_details, reset]);
  return (
    <>
      {
        isClient &&
        <>
          {
            restaurantId ?
              <div>
                <div className="flex flex-wrap justify-between items-center mb-5">
                  <PageBreadcrumb pageTitle="Food Items" breadCrumbTitle="Food Items" />
                  <Button size="sm" variant="primary" startIcon={<FoodItemIcon />} onClick={openModal}>
                    Add Food Item
                  </Button>
                </div>
                <div className='flex flex-wrap justify-center items-center mb-5 gap-3'>
                  {
                    restaurant_menu?.map((item, index) => (
                      <button key={index} className={`flex items-center justify-center w-auto h-10 rounded-xl text-sm px-3 ${selectedMenu === item._id ? "bg-brand-500 text-gray-100 dark:bg-brand-500 dark:text-gray-100" : " bg-gray-100 dark:bg-gray-300"}`} onClick={() => handleSelectMenu(item._id)}>
                        {item.name}
                      </button>
                    ))
                  }
                </div>
                <div className="grid grid-cols-12 gap-4 md:gap-6">
                  {
                    food_item?.filter(item => selectedMenu ? item.menu._id === selectedMenu : true).map((item, index) =>
                    (
                      <div className="col-span-12 sm:col-span-6 space-y-6 md:col-span-4" key={index}>
                        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.15]">
                          <div className="flex items-center  gap-4 justify-start">
                            <Image
                              src={item.image}
                              width={80}
                              height={80}
                              alt='Food Item'

                              className='rounded-xl h-[80px]!'
                            />
                            <h5 className="mt-2 font-bold text-gray-800 text-md dark:text-white/90">
                              {item.name}
                            </h5>
                          </div>
                          <div className="flex items-center flex-wrap justify-start mt-5 gap-4">
                            <div className="flex items-center justify-center w-20 h-12 bg-gray-100 rounded-xl dark:bg-gray-300 text-sm">
                              ₹{item.price}
                            </div>
                            <div className="flex flex-col items-center justify-center w-auto h-12 px-3 bg-gray-100 rounded-xl dark:bg-gray-300 text-sm">
                              <h6 className='text-[12px] text-brand-500'>Menu</h6>
                              {item?.menu?.name}
                            </div>
                            <div className="flex items-center justify-center w-20 h-12 bg-gray-100 rounded-xl dark:bg-gray-300 text-sm">
                              {item.isAvailable ? "Available" : "Unavailable"}
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
                        {!isEditing ? "Add Food Item" : "Edit Food Item"}
                      </h4>
                    </div>
                    {/* @ts-expect-error resetting with string | File | null*/}
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
                              <Label>Select Sub Category</Label>
                              <div className="relative">
                                <Controller
                                  control={control}
                                  name="subCategory"
                                  render={({ field }) => (
                                    <Select
                                      {...field}
                                      value={field.value ?? ""}
                                      options={subCategoryOption}
                                      placeholder="Select Sub Category"
                                      className="dark:bg-dark-900"
                                    />
                                  )}
                                />
                                <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                                  <ChevronDownIcon />
                                </span>
                              </div>
                              {errors.subCategory && (
                                <p style={{ color: "red", margin: "0", padding: "5px" }}>
                                  {errors.subCategory.message}
                                </p>
                              )}
                            </div>
                            <div>
                              <Label>Select Menu</Label>
                              <div className="relative">
                                <Controller
                                  control={control}
                                  name="menu"
                                  render={({ field }) => (
                                    <Select
                                      {...field}
                                      value={field.value ?? ""}
                                      options={menuOption}
                                      placeholder="Select Menu"
                                      className="dark:bg-dark-900"
                                    />
                                  )}
                                />
                                <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                                  <ChevronDownIcon />
                                </span>
                              </div>
                              {errors.subCategory && (
                                <p style={{ color: "red", margin: "0", padding: "5px" }}>
                                  {errors.subCategory.message}
                                </p>
                              )}
                            </div>
                            <div>
                              <Label>Restaurant</Label>
                              <div className="relative">
                                <Controller
                                  control={control}
                                  name="restaurant"
                                  render={({ field }) => (
                                    <Input {...field}
                                      value={restaurantId}
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
                            <div>
                              <Label>Image</Label>
                              <div className="relative">
                                <Controller
                                  control={control}
                                  name="image"
                                  render={({ field: { onChange } }) => (
                                    <FileInput onChange={(e) => {
                                      const file = e.target.files?.[0] || null
                                      setImage(file)
                                      onChange(file)
                                    }} />
                                  )}
                                />
                              </div>
                              {errors.image && (
                                <p style={{ color: "red", margin: "0", padding: "5px" }}>
                                  {errors.image.message}
                                </p>
                              )}
                            </div>
                            <div>
                              <Label>Price</Label>
                              <div className="relative">
                                <Controller
                                  control={control}
                                  name="price"
                                  render={({ field }) => (
                                    <Input {...field}
                                      value={field.value ?? ""}
                                      type='number'
                                    />
                                  )}
                                />
                                {errors.price && (
                                  <p style={{ color: "red", margin: "0", padding: "5px" }}>
                                    {errors.price.message}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className='mt-4'>
                            <Label>Description</Label>
                            <div className="relative">
                              <Controller
                                control={control}
                                name="description"
                                render={({ field }) => (
                                  <TextArea {...field}
                                    placeholder='Enter Description'
                                    value={field.value ?? ""}
                                  />
                                )}
                              />
                              {errors.description && (
                                <p style={{ color: "red", margin: "0", padding: "5px" }}>
                                  {errors.description.message}
                                </p>
                              )}
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
                            <TrashBinIcon /> Delete
                          </Button> :
                            <Button size="sm" variant="outline" onClick={() => {
                              setIsEditing(false)
                              closeModal()
                              reset()
                            }}>
                              Cancel
                            </Button>
                        }
                        <Button size="sm" type="submit" disabled={isSubmitting || isCreating || isUpdating}>
                          {isEditing ? (isUpdating ? "Saving..." : "Save") : (isCreating ? "Submitting..." : "Submit")}
                        </Button>
                      </div>
                    </form>
                  </div>
                </Modal>
              </div>
              : <div className='flex justify-center flex-col items-center'>
                <h2 className='text-gray-800 text-[30px] dark:text-white/90 text-center font-semibold'>Welcome to <span className='text-brand-500'>Spice Junction</span></h2>
                <h4 className='text-gray-800 text-lg dark:text-white/90 mt-8 text-center font-semibold text-[20px]'><span className='text-brand-500'>Ready to serve?</span><br></br>Add your restaurant details to get started</h4>
                <Link href={"/restaurant"}>
                  <Button size="sm" variant="primary" className='mt-4' startIcon={<RestaurantIcon />}>
                    Add Restaurant
                  </Button>
                </Link>
              </div>
          }
        </>
      }
    </>
  )
}

export default Items