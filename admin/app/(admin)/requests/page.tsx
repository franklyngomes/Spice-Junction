"use client"
import React from 'react'
import { AllRequestQuery, RespondRequestQuery } from '../../../api/query/RestaurantQuery'
import Image from 'next/image'
import Button from '../../../components/ui/button/Button'
import { useStore } from '../../../store/store'
import { ChevronDownIcon, SettingsIcon } from '../../../icons'
import { Modal } from '../../../components/ui/modal'
import { useModal } from '../../../hooks/useModal'
import { Controller, useForm } from 'react-hook-form'
import Label from '../../../components/form/Label'
import Input from '../../../components/form/input/InputField'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup";
import Select from '../../../components/form/Select'
import toast from 'react-hot-toast'
import PageBreadcrumb from '../../../components/common/PageBreadCrumb'
import { RequestData } from '../../../types/types'

const approveOptions = [
  {
    label: "Approve",
    value: "true"
  },
  {
    label: "Disapprove",
    value: "false"
  }
]
const schema = yup.object({
  name: yup.string(),
  isApprovedStatus: yup.string(),
});
const AllRequest = () => {
  const { editId, isEditing, setIsEditing, setEditId } = useStore();
  const { data } = AllRequestQuery()
  const requests = data?.data
  const { handleSubmit, reset, control, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const { isOpen, openModal, closeModal } = useModal();
  const { mutateAsync: update } = RespondRequestQuery()

  const onSubmit = (data: RequestData) => {
    const { isApprovedStatus } = data
    let response
    if (isApprovedStatus === "false") {
      response = false
    } else if (isApprovedStatus === "true") {
      response = true
    }
    const payload = { response }
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
    if (isEditing && requests) {
      const current = requests.find((r) => r._id === editId); // pick the right item
      if (current) {
        reset({
          name: current.name,
          isApprovedStatus: current.isApproved ? "true" : "false",
        });
      }
    } else {
      reset({
        name: "",
        isApprovedStatus: "",
      })
    }
  }, [isEditing, requests, reset]);
  React.useEffect(() => {
    if (isEditing) {
      openModal()
    }
  }, [isEditing, openModal])
  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-4">
        <PageBreadcrumb pageTitle="Restaurant Requests" breadCrumbTitle="Restaurant Requests" />
      </div>
      {
        requests?.length ? requests?.map((item, index: number) => (
          <div className="col-span-12 sm:col-span-6 space-y-6 md:col-span-4" key={index}>
            <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.15]">
              <div className="flex items-center  gap-4 justify-start">
                <Image
                  src={`${item.image}`}
                  width={80}
                  height={80}
                  alt='Category Item'

                  className='rounded-xl h-[80px]!'
                />
                <h5 className="mt-2 font-bold text-gray-800 text-md dark:text-white/90">
                  {item.name}
                </h5>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.15] mt-5">
                <div className='mb-5'>
                  <p className='text-[12px] text-brand-500 font-semibold'>Status</p>
                  <h6 className="mt-2 font-bold text-gray-800 text-md dark:text-white/90">
                    {item.isApproved ? "Approved" : "Pending Approval"}
                  </h6>
                </div>
                <div className='mb-5'>
                  <p className='text-[12px] text-brand-500 font-semibold'>Cuisines</p>
                  <h6 className="mt-2 font-bold text-gray-800 text-md dark:text-white/90">
                    {item?.cuisine?.map((item: string, index: number) => (<span key={index} className='mr-2'>{item},</span>))}
                  </h6>
                </div>
                <div className='mb-5'>
                  <h5 className="mt-2 font-bold text-gray-800 text-lg dark:text-white/90">
                    <p className='text-[12px] text-brand-500'>Address</p>
                    {item.address.buildingNo} {item.address.street}, {item.address.city}, {item.address.pinCode}
                  </h5>
                </div>
                <div>
                  <Button size="sm" variant="primary" endIcon={<SettingsIcon />} onClick={() => {
                    setIsEditing(true)
                    setEditId(item._id)
                  }}>
                    Settings
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))
          :
          <div>
            <h5 className="mt-2 font-bold text-gray-800 text-md dark:text-white/90">
              No New Requests!
            </h5>
          </div>
      }
      <Modal isOpen={isOpen} onClose={() => {
        setIsEditing(false)
        closeModal()
        reset()
      }} className="max-w-[800px] m-4 h-auto">
        <div className="no-scrollbar relative w-full h-auto max-w-[800px] overflow-y-auto rounded-2xl bg-white p-5 dark:bg-gray-900">
          <div className="px-2 pr-14">
            <h4 className="mb-5 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Restaurant Settings
            </h4>
          </div>
          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
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
                            disabled
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Approve Status</Label>
                    <div className="relative">
                      <Controller
                        control={control}
                        name="isApprovedStatus"
                        render={({ field }) => (
                          <Select
                            {...field}
                            value={field.value}
                            options={approveOptions}
                            placeholder="Select Option"
                            className="dark:bg-dark-900"
                          />
                        )}
                      />
                      <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                        <ChevronDownIcon />
                      </span>
                    </div>
                    {errors.isApprovedStatus && (
                      <p style={{ color: "red", margin: "0", padding: "5px" }}>
                        {errors.isApprovedStatus.message}
                      </p>
                    )}
                  </div>
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

export default AllRequest