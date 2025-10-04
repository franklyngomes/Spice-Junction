"use client"
import React from 'react'
import Image from 'next/image'
import PageBreadcrumb from '../../../components/common/PageBreadCrumb'
import Button from '../../../components/ui/button/Button'
import { RestaurantIcon } from '../../../icons'
import { Modal } from '../../../components/ui/modal'
import { useModal } from '../../../hooks/useModal'
import { useStore } from '../../../store/store'
import Label from '../../../components/form/Label'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from '../../../components/form/input/InputField'
import * as yup from "yup";
import { Cookies } from 'react-cookie'
import TextArea from '../../../components/form/input/TextArea'
import FileInput from '../../../components/form/input/FileInput'
import MultiSelect from '../../../components/form/MultiSelect'
import { AllZoneQuery } from '../../../api/query/DeliveryZoneQuery'
import { CreateRestaurantQuery, RestaurantByOwnerQuery } from '../../../api/query/RestaurantQuery'
import toast from 'react-hot-toast'
import { DeliveryZoneItem, RestaurantData } from '../../../types/types'


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const schema = yup.object({
  name: yup.string().required("Name is required"),
  ownerId: yup.string().required("OwnerId is required"),
  buildingNo: yup.string().required("Building No. is required"),
  street: yup.string().required("Street is required"),
  city: yup.string().required("City is required"),
  pinCode: yup.string().required("Pin Code is required"),
  phone: yup.string().matches(phoneRegExp, 'Phone number is not valid').required("Phone is required"),
  cuisine: yup.array().of(yup.string()).required("Cuisine is required"),
  image: yup
    .mixed<File | string>()
    .test("file-or-url", "Image is required", (value) => {
      if (!value) return false;
      if (typeof value === "string") return value.trim().length > 0;
      if (value instanceof File) return value.size > 0;
      return false;
    }),
  deliveryZone: yup.array().of(yup.string()).required("Delivery Zone is required"),
});

const cuisineList = [
  { value: "North Indian", text: "North Indian", selected: false },
  { value: "South Indian", text: "South Indian", selected: false },
  { value: "Chinese", text: "Chinese", selected: false },
  { value: "Italian", text: "Italian", selected: false },
  { value: "Continental", text: "Continental", selected: false },
  { value: "Fast Food", text: "Fast Food", selected: false },
  { value: "Beverages", text: "Beverages", selected: false },
  { value: "Desserts", text: "Desserts", selected: false },
  { value: "Bakery", text: "Bakery", selected: false },
  { value: "Street Food", text: "Street Food", selected: false },
  { value: "Biryani", text: "Biryani", selected: false },
  { value: "Burgers", text: "Burgers", selected: false },
  { value: "Rolls", text: "Rolls", selected: false },
  { value: "Pizza", text: "Pizza", selected: false },
  { value: "Seafood", text: "Seafood", selected: false },
  { value: "Mexican", text: "Mexican", selected: false },
  { value: "Finger Food", text: "Finger Food", selected: false },
  { value: "Asian", text: "Asian", selected: false },
  { value: "Snacks", text: "Snacks", selected: false },
  { value: "Ice Cream", text: "Ice Cream", selected: false },
]

const Restaurant = () => {
  const [zoneList, setZoneList] = React.useState<{ value: string; text: string; selected: boolean; }[]>([])
  const [isClient, setIsClient] = React.useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [zoneOption, setZoneOption] = React.useState<{ label: string; value: string }[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [image, setImage] = React.useState<File | null>(null)
  const cookies = new Cookies()
  const userId = cookies.get("userId")
  const { data } = AllZoneQuery()
  const zone = data?.data
  const { data: restaurant } = RestaurantByOwnerQuery(userId, !!userId)
  const restaurant_details = restaurant?.data
  console.log(restaurant_details)
  const { isOpen, openModal, closeModal } = useModal();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { editId, isEditing, setIsEditing, setEditId } = useStore();
  const { handleSubmit, reset, control, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  let id = cookies.get("restaurant")
  if (!id || id === "undefined") {
    id = undefined
  }
  const { mutateAsync: create, isPending: isCreating } = CreateRestaurantQuery()

  const onSubmit = (data: RestaurantData) => {
    const { name,
      ownerId,
      buildingNo,
      street,
      city,
      pinCode,
      phone,
      cuisine,
      deliveryZone } = data
    const formdata = new FormData()
    formdata.append("name", name)
    formdata.append("ownerId", ownerId)
    formdata.append("buildingNo", buildingNo)
    formdata.append("street", street)
    formdata.append("city", city)
    formdata.append("pinCode", pinCode)
    formdata.append("phone", phone)
    cuisine.forEach((cuisine: string) => {
      formdata.append("cuisine", cuisine)
    })
    deliveryZone.forEach((zone: string) => {
      formdata.append("deliveryZone", zone)
    })
    if (data.image) {
      if (data.image instanceof File) {
        formdata.append("image", data.image);
      } else if (typeof data.image === "string") {
        formdata.append("image", data.image);
      }
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

  const onUpdate = () => {

  }
  React.useEffect(() => {
    if (isEditing) {
      openModal()
    }
  }, [isEditing, openModal])
  React.useEffect(() => {
    if (zone && Array.isArray(zone)) {
      setZoneOption(zone.map((itm) => ({ label: itm.zoneName, value: itm._id })));
      const formattedZone = zone.map((item) => ({ value: item._id, text: item.zoneName, selected: false }))
      setZoneList(formattedZone)
    }
  }, [zone])
  React.useEffect(() => {
    if (isEditing && restaurant_details) {
      reset({
        name: restaurant_details.name,
        ownerId: restaurant_details.ownerId,
        buildingNo: restaurant_details.address.buildingNo,
        street: restaurant_details.address.street,
        city: restaurant_details.address.city,
        pinCode: restaurant_details.address.pinCode,
        phone: restaurant_details.phone,
        cuisine: restaurant_details.cuisine,
        image: restaurant_details.image,
        deliveryZone: restaurant_details.deliveryZone
      });
    } else {
      reset({
        name: "",
        ownerId: userId,
        buildingNo: "",
        street: "",
        city: "",
        pinCode: "",
        phone: "",
        cuisine: [],
        image: "",
        deliveryZone: []
      })
    }
  }, [isEditing, restaurant_details, reset]);

  React.useEffect(() => {
    setIsClient(true);
  }, []);
  React.useEffect(() => {
    if(restaurant_details){
      cookies.set("restaurant", restaurant_details._id)
    }
  },[restaurant_details])
  return (
    <div>
      {isClient && (
        <div>
          <div className="flex flex-wrap justify-between items-center mb-4">
            <PageBreadcrumb pageTitle="My Restaurant" breadCrumbTitle="Restaurant" />
            <Button size="sm" variant="primary" startIcon={<RestaurantIcon />} onClick={openModal}>
              {!id ? "Add Restaurant" : "Edit Restaurant"}
            </Button>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
            {
              id !== undefined && restaurant_details ?
                <div className="space-y-6">
                  <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                    <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                      <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
                        <div className="overflow-hidden border border-gray-200 rounded-lg dark:border-gray-800">
                          <Image
                            width={400}
                            height={400}
                            src={restaurant_details?.image}
                            alt="user"
                            className='object-cover h-auto'
                          />
                        </div>
                        <div className="order-3 xl:order-2">
                          <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                            {restaurant_details?.name}
                          </h4>
                          <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Restaurant
                            </p>
                            <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {restaurant_details?.address.buildingNo} {restaurant_details?.address.street}, {restaurant_details?.address.city}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                          More Information
                        </h4>

                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                          <div>
                            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                              Status
                            </p>
                            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                              {!restaurant_details?.isApproved ? "Not Approved" : "Approved"}
                            </p>
                          </div>

                          <div>
                            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                              Cuisines
                            </p>
                            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                              {restaurant_details?.cuisine?.map((item: string, index: number) => (<span key={index} className='mr-2'>{item},</span>))}
                            </p>
                          </div>

                          <div>
                            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                              Email address
                            </p>
                            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                              {restaurant_details?.ownerId?.email}
                            </p>
                          </div>

                          <div>
                            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                              Owner Name
                            </p>
                            <p className="text-sm flex gap-2 font-medium text-gray-800 dark:text-white/90">
                              <span>{restaurant_details?.ownerId?.firstName}</span>
                              <span>{restaurant_details?.ownerId?.lastName}</span>
                            </p>
                          </div>
                          <div>
                            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                              Preferred Delivery Zones
                            </p>
                            <p className="text-sm flex gap-2 font-medium text-gray-800 dark:text-white/90">
                              {restaurant_details?.deliveryZone?.map((item: DeliveryZoneItem, index: number) => (<span key={index} className='mr-2'>{item.zoneName},</span>))}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                :
                <div className='flex justify-center flex-col items-center'>
                  <h2 className='text-gray-800 text-[30px] dark:text-white/90 text-center font-semibold'>You are almost there!</h2>
                  <h4 className='text-gray-800 text-lg dark:text-white/90 mt-8 text-center font-semibold text-[20px]'>Add your restaurant details and wait for Admin verification.</h4>
                </div>
            }
          </div>
          <Modal isOpen={isOpen} onClose={() => {
            setIsEditing(false)
            closeModal()
            reset()
          }} className="max-w-[800px] m-4 h-[90vh]">
            <div className="no-scrollbar relative w-full h-[90vh] max-w-[800px] overflow-y-auto rounded-2xl bg-white p-5 dark:bg-gray-900">
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
                        <Label>Owner</Label>
                        <div className="relative">
                          <Controller
                            control={control}
                            name="ownerId"
                            render={({ field }) => (
                              <Input {...field}
                                value={userId ?? ""}
                                disabled
                              />
                            )}
                          />
                          {errors.ownerId && (
                            <p style={{ color: "red", margin: "0", padding: "5px" }}>
                              {errors.ownerId.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <Label>Phone</Label>
                        <div className="relative">
                          <Controller
                            control={control}
                            name="phone"
                            render={({ field }) => (
                              <Input {...field}
                                value={field.value ?? ""}
                              />
                            )}
                          />
                          {errors.phone && (
                            <p style={{ color: "red", margin: "0", padding: "5px" }}>
                              {errors.phone.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="relative">
                          <Controller
                            control={control}
                            name="deliveryZone"
                            render={({ field }) => {
                              const { value = [], onChange } = field;
                              return (
                                <MultiSelect
                                  label="Select Delivery Zone"
                                  options={zoneList}
                                  defaultSelected={(value ?? []) as string[]}
                                  onChange={(selected: string[]) => onChange(selected)}
                                />
                              );
                            }}
                          />
                        </div>
                        {errors.deliveryZone && (
                          <p style={{ color: "red", margin: "0", padding: "5px" }}>
                            {errors.deliveryZone.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label>Building No.</Label>
                        <div className="relative">
                          <Controller
                            control={control}
                            name="buildingNo"
                            render={({ field }) => (
                              <Input {...field}
                                value={field.value ?? ""}
                              />
                            )}
                          />
                        </div>
                        {errors.buildingNo && (
                          <p style={{ color: "red", margin: "0", padding: "5px" }}>
                            {errors.buildingNo.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className='mt-5'>
                      <Label>Street</Label>
                      <div className="relative">
                        <Controller
                          control={control}
                          name="street"
                          render={({ field }) => (
                            <TextArea {...field}
                              placeholder='Enter Street Name'
                              value={field.value ?? ""}
                            />
                          )}
                        />
                      </div>
                      {errors.street && (
                        <p style={{ color: "red", margin: "0", padding: "5px" }}>
                          {errors.street.message}
                        </p>
                      )}
                    </div>
                    <div className='mt-5'>
                      <Label>City</Label>
                      <div className="relative">
                        <Controller
                          control={control}
                          name="city"
                          render={({ field }) => (
                            <Input {...field}
                              value={field.value ?? ""}
                            />
                          )}
                        />
                        {errors.city && (
                          <p style={{ color: "red", margin: "0", padding: "5px" }}>
                            {errors.city.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className='mt-5'>
                      <Label>Pin Code</Label>
                      <div className="relative">
                        <Controller
                          control={control}
                          name="pinCode"
                          render={({ field }) => (
                            <Input {...field}
                              value={field.value ?? ""}
                            />
                          )}
                        />
                        {errors.pinCode && (
                          <p style={{ color: "red", margin: "0", padding: "5px" }}>
                            {errors.pinCode.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className='mt-5'>
                      <div className="relative">
                        <Controller
                          control={control}
                          name="cuisine"
                          render={({ field }) => {
                            const { value = [], onChange } = field;
                            return (
                              <MultiSelect
                                label="Select Cuisine"
                                options={cuisineList}
                                defaultSelected={(value ?? []) as string[]} // expects string[]
                                onChange={(selected: string[]) => onChange(selected)}
                              />
                            );
                          }}
                        />
                      </div>
                      {errors.cuisine && (
                        <p style={{ color: "red", margin: "0", padding: "5px" }}>
                          {errors.cuisine.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                  {
                    <Button size="sm" variant="outline" onClick={() => {
                      setIsEditing(false)
                      closeModal()
                      reset()
                    }}>
                      Cancel
                    </Button>
                  }
                  <Button size="sm" type="submit" disabled={isCreating}>
                    {isEditing ?  "Save" : (isCreating ? "Submitting..." : "Submit")}
                  </Button>
                </div>
              </form>
            </div>
          </Modal>
        </div>
      )}
    </div>
  )
}

export default Restaurant