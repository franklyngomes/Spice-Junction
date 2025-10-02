"use client"
import React from 'react'
import { DeliveryZoneIcon, PencilIcon, TrashBinIcon } from '../../../icons'
import Button from "../../../components/ui/button/Button";
import PageBreadcrumb from '../../../components/common/PageBreadCrumb';
import { Modal } from '../../../components/ui/modal';
import { useStore } from '../../../store/store';
import Label from '../../../components/form/Label';
import { Controller, useForm } from 'react-hook-form';
import Input from '../../../components/form/input/InputField';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useModal } from '../../../hooks/useModal';
import { DeliveryZoneData } from '../../../types/types';
import toast from 'react-hot-toast';
import { AllZoneQuery, CreateZoneQuery, DeleteZoneQuery, ZoneDetailsQuery } from '../../../api/query/DeliveryZoneQuery';

const schema = yup.object({
  zoneName: yup.string().required("Zone name is required"),
  district: yup.string().required("District is required"),
});
const DeliveryZone = () => {
  const { editId, isEditing, setIsEditing, setEditId } = useStore();
  const { data } = AllZoneQuery()
  const zone = data?.data
  const { data: details } = ZoneDetailsQuery(editId, !!editId)
  const zone_details = details?.data
  const { isOpen, openModal, closeModal } = useModal();
  const { handleSubmit, reset, control, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const { mutateAsync: create } = CreateZoneQuery()
  const { mutateAsync: delete_zone } = DeleteZoneQuery()

  const onSubmit = (data: DeliveryZoneData) => {
    const { zoneName, district } = data
    console.log("Api Call")
    const payload = {
      zoneName,
      district
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
  const onDelete = () => {
    const id = editId
    delete_zone(id, {
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
    if (isEditing && zone_details) {
      reset({
        zoneName: zone_details.zoneName,
        district: zone_details.district
      });
    } else {
      reset({
        zoneName: "",
        district: ""
      })
    }
  }, [isEditing, zone_details, reset]);
  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-4">
        <PageBreadcrumb pageTitle="Delivery Zone" breadCrumbTitle="Delivery Zone" />
        <Button size="sm" variant="primary" startIcon={<DeliveryZoneIcon />} onClick={openModal}>
          Add Zone
        </Button>
      </div>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {
          zone?.map((item, index) => (
            <div className="col-span-12 sm:col-span-6 space-y-6 md:col-span-4" key={index}>
              <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.15]">
                <div className="flex items-end justify-between">
                  <div>
                    <h5 className="mt-2 font-bold text-gray-800 text-lg dark:text-white/90">
                      <p className='text-[12px] text-brand-500'>Area</p>
                      {item.zoneName}
                    </h5>
                  </div>
                  <div>
                    <h5 className="mt-2 font-bold text-gray-800 text-lg dark:text-white/90">
                      <p className='text-[12px] text-brand-500'>District</p>
                      {item.district}
                    </h5>
                  </div>
                </div>
                <div>
                  <h5 className="mt-2 font-bold text-gray-800 text-lg dark:text-white/90">
                    <p className='text-[12px] text-brand-500'>Zone</p>
                    {item.division}
                  </h5>
                </div>
                <div>
                  <h5 className="mt-2 font-bold bg-gray-200 dark:bg-gray-600 rounded-lg p-2 mb-4 text-gray-800 text-lg dark:text-white/90">
                    <p className='text-[12px] text-brand-500'>Pincodes</p>
                    <div className='flex flex-row gap-3 mb-4'>
                    {item.pinCodeList?.map((item: string, index: number) => (
                        <div key={index} className="flex justify-center items-center w-20 h-8 px-3 bg-gray-100 rounded-md dark:bg-gray-300 text-sm text-brand-500">
                          {item}
                        </div>
                    ))}
                    </div>
                  </h5>
                </div>
                <div>
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
              {!isEditing ? "Add Zone" : "Edit Zone"}
            </h4>
          </div>
          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <div className="custom-scrollbar h-auto overflow-y-auto px-2 pb-3">
              <div>
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div>
                    <Label>Zone Name</Label>
                    <div className="relative">
                      <Controller
                        control={control}
                        name="zoneName"
                        render={({ field }) => (
                          <Input {...field}
                            value={field.value ?? ""}
                          />
                        )}
                      />
                      {errors.zoneName && (
                        <p style={{ color: "red", margin: "0", padding: "5px" }}>
                          {errors.zoneName.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label>District</Label>
                    <div className="relative">
                      <Controller
                        control={control}
                        name="district"
                        render={({ field }) => (
                          <Input {...field}
                            value={field.value ?? ""}
                          />
                        )}
                      />
                      {errors.district && (
                        <p style={{ color: "red", margin: "0", padding: "5px" }}>
                          {errors.district.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              {
                isEditing ? <Button size="sm" type='button' variant="outline" className='text-brand-500!' onClick={() => {
                  setIsEditing(false)
                  onDelete()
                  closeModal()
                  reset()
                }}>
                  <TrashBinIcon /> Delete
                </Button> :
                  <Button size="sm" variant="outline" type='button' onClick={() => {
                    setIsEditing(false)
                    closeModal()
                    reset()
                  }}>
                    Cancel
                  </Button>
              }
              {
                !isEditing ? 
                <Button size="sm" type="submit">
                Submit
              </Button>
              : null
              }
            </div>
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default DeliveryZone