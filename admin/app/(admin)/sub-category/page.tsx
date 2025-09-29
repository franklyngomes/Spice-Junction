"use client"
import React from 'react'
import { CategoryIcon, PencilIcon, TrashBinIcon } from '../../../icons'
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
import { SubCategoryData } from '../../../types/types';
import toast from 'react-hot-toast';
import { AllSubCategoryQuery, CreateSubCategoryQuery, DeleteSubCategoryQuery, SubCategoryDetailsQuery, UpdateSubCategoryQuery } from '../../../api/query/SubCategoryQuery';
import FileInput from '../../../components/form/input/FileInput';
import { AllCategoryQuery } from '../../../api/query/CategoryQuery';
import Image from 'next/image';
import MultiSelect from '../../../components/form/MultiSelect';

const schema = yup.object({
  name: yup.string().required("Name is required"),
  image: yup
    .mixed<File | string>()
    .test("file-or-url", "Image is required", (value) => {
      if (!value) return false;
      if (typeof value === "string") return value.trim().length > 0;
      if (value instanceof File) return value.size > 0;
      return false;
    }),
  category: yup.array().of(yup.string()).required("Sub Category is required"),
});
const SubCategory = () => {
  const [categoryList, setCategoryList] = React.useState<{ value: string; text: string; selected: boolean; }[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [image, setImage] = React.useState<File | null>(null)
  const { editId, isEditing, setIsEditing, setEditId } = useStore();
  const { data } = AllSubCategoryQuery()
  const subCategory = data?.data
  const { data: details } = SubCategoryDetailsQuery(editId, !!editId)
  const category_details = details?.data
  const { data: category } = AllCategoryQuery()
  const categories = category?.data
  const { isOpen, openModal, closeModal } = useModal();
  const { handleSubmit, reset, control, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const { mutateAsync: create } = CreateSubCategoryQuery()
  const { mutateAsync: update } = UpdateSubCategoryQuery()
  const { mutateAsync: delete_sub_category } = DeleteSubCategoryQuery()

  const onSubmit = (data: SubCategoryData) => {
    const { name, category, image } = data
    const formdata = new FormData()
    formdata.append("name", name)
    if (image instanceof File) {
      formdata.append("image", image);
    }
    category.forEach((cat: string) => {
      formdata.append("category", cat)
    })
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
  const onUpdate = (data: SubCategoryData) => {
    const { name, category, image } = data
    const formdata = new FormData()
    formdata.append("name", name)
    category.forEach((cat: string) => {
      formdata.append("category", cat)
    })
    if (image && image instanceof File) {
      formdata.append("image", image);
    } else {
      formdata.append("image", category_details?.image ?? "")
    }
    update({ editId, formdata }, {
      onSuccess: (res) => {
        if (res.error) {
          toast.error(res.message);
          return;
        }
        setIsEditing(false)
        closeModal()
        reset()
        toast.success(res?.message);
      },
    })
  }
  const onDelete = () => {
    const id = editId
    delete_sub_category(id, {
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
    if (categories && Array.isArray(categories)) {
      const formattedCategory = categories.map((item) => ({ value: item._id, text: item.name, selected: false }))
      setCategoryList(formattedCategory)
    }
  }, [categories])

  React.useEffect(() => {
    if (isEditing && category_details) {
      reset({
        name: category_details.name,
        category: category_details.category?.map((item) => item?._id) ?? [],
        image: category_details.image ?? ""
      });
    } else {
      reset({
        name: "",
        category: [],
        image: "",
      })
    }
  }, [isEditing, category_details, reset]);
  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-4">
        <PageBreadcrumb pageTitle="Sub Category" breadCrumbTitle="Sub Category" />
        <Button size="sm" variant="primary" startIcon={<CategoryIcon />} onClick={openModal}>
          Add Sub Category
        </Button>
      </div>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {
          subCategory?.map((item, index) => (
            <div key={index} className="col-span-12 sm:col-span-6 space-y-6 md:col-span-4 rounded-2xl border dark:border-gray-800 dark:bg-white/[0.15] bg-white shadow-sm hover:shadow-md transition overflow-hidden">
              {/* Image with floating edit button */}
              <div className="relative p-3">
                <Image
                  src={`${item.image}`}
                  width={100}
                  height={100}
                  alt='Category Item'

                  className='rounded-xl h-25! w-25'
                />
                <button className="absolute top-2 right-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg p-4 shadow-md transition" onClick={() => {
                  setIsEditing(true)
                  setEditId(item._id)
                }}>
                  <PencilIcon className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Dish Name */}
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">{item.name}</h3>

                {/* Items Count */}
                <p className="text-sm text-gray-300 mt-1">{item?.items?.length} Items</p>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {item?.category.map((itm, index) => (
                    <div key={index} className="flex items-center justify-center gap-2 w-auto h-auto px-2 bg-gray-300 dark:bg-brand-500 dark:text-white/90 rounded-md">
                      {itm.name}
                    </div>
                  ))}
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
              {!isEditing ? "Add Sub Category" : "Edit Sub Category"}
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
                    <div className="relative">
                      <Controller
                        control={control}
                        name="category"
                        render={({ field }) => {
                          const { value = [], onChange } = field;
                          return (
                            <MultiSelect
                              label="Select Category"
                              options={categoryList}
                              /* @ts-expect-error resetting with string | File | null*/
                              defaultSelected={value?.map((item) => item)}
                              onChange={(selected: string[]) => onChange(selected)}
                            />
                          );
                        }}
                      />
                    </div>
                    {errors.category && (
                      <p style={{ color: "red", margin: "0", padding: "5px" }}>
                        {errors.category.message}
                      </p>
                    )}
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

export default SubCategory