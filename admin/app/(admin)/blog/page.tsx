"use client"
import React from 'react'
import { PencilIcon, TrashBinIcon, UserIcon, VideoIcon } from '../../../icons'
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
import { Cookies } from 'react-cookie';
import toast from 'react-hot-toast';
import Image from 'next/image';
import FileInput from '../../../components/form/input/FileInput';
import TextArea from '../../../components/form/input/TextArea';
import { AllBlogQuery, BlogDetailsQuery, CreateBlogQuery, DeleteBlogQuery, UpdateBlogQuery } from '../../../api/query/BlogQuery';
import { BlogData } from '../../../types/types';

const schema = yup.object({
  title: yup.string().min(6).max(50).required("Title is required"),
  description: yup.string().required("Description is required"),
  author: yup.string().required("Author is required"),
  image: yup
    .mixed<File | string>()
    .test("file-or-url", "Image is required", (value) => {
      if (!value) return false;
      if (typeof value === "string") return value.trim().length > 0;
      if (value instanceof File) return value.size > 0;
      return false;
    }),
});
const Blogs = () => {
  const [isClient, setIsClient] = React.useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [image, setImage] = React.useState<File | null>(null)
  const cookies = new Cookies()
  const userId = cookies.get("userId")
  const { editId, isEditing, setIsEditing, setEditId } = useStore();
  const { data } = AllBlogQuery()
  const blogs = data?.data
  const { data: details } = BlogDetailsQuery(editId, !!editId)
  const blog_details = details?.data
  const { isOpen, openModal, closeModal } = useModal();

  const { handleSubmit, reset, control, formState: { errors, isSubmitting } } = useForm({ resolver: yupResolver(schema) });
  const { mutateAsync: create, isPending: isCreating } = CreateBlogQuery()
  const { mutateAsync: update, isPending: isUpdating } = UpdateBlogQuery()
  const { mutateAsync: delete_food_item } = DeleteBlogQuery()
  const onSubmit = (data: BlogData) => {
    const { title, description, author, image } = data
    const formdata = new FormData()
    formdata.append("title", title)
    formdata.append("description", description)
    formdata.append("author", author)
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
  const onUpdate = (data: BlogData) => {
    const { title, description, author, image } = data
    const formdata = new FormData()
    formdata.append("title", title)
    formdata.append("description", description)
    formdata.append("author", author)
    if (image && image instanceof File) {
      formdata.append("image", image);
    } else {
      formdata.append("image", blog_details?.image ?? "")
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
  React.useEffect(() => {
    if (isEditing) {
      openModal()
    }
  }, [isEditing, openModal])
  React.useEffect(() => {
    setIsClient(true)
  }, [])
  React.useEffect(() => {
    if (isEditing && blog_details) {
      reset({
        title: blog_details.title,
        description: blog_details.description,
        author: blog_details.author._id,
        image: blog_details.image,
      });
    } else {
      reset({
        title: "",
        description: "",
        author: userId,
        image: "",
      })
    }
  }, [isEditing, blog_details, reset]);
  return (
    <>
      {
        isClient &&
        <>
          <div>
            <div className="flex flex-wrap justify-between items-center mb-5">
              <PageBreadcrumb pageTitle="Food Items" breadCrumbTitle="Food Items" />
              <Button size="sm" variant="primary" startIcon={<VideoIcon />} onClick={openModal}>
                Add New Blog
              </Button>
            </div>
            <div className="grid grid-cols-12 gap-4 md:gap-6">
              {
                blogs?.map((item, index) =>
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
                          {item.title}
                        </h5>
                      </div>
                      <div className='flex items-center gap-2 mt-4'>
                        <UserIcon className="dark:text-white/90"/>
                        <h6 className="mt-2 font-bold text-gray-800 text-md dark:text-white/90">
                          {item.author.firstName} {item.author.lastName}
                        </h6>
                      </div>
                       <div className='mt-4'>
                        <p className='dark:text-white/90'>{item.description}</p>
                       </div>
                      <div className="flex items-center flex-wrap justify-start mt-5 gap-4">
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
                {/* @ts-expect-error ignore*/}
                <form className="flex flex-col" onSubmit={isEditing ? handleSubmit(onUpdate) : handleSubmit(onSubmit)}>
                  <div className="custom-scrollbar h-auto overflow-y-auto px-2 pb-3">
                    <div>
                      <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                        <div>
                          <Label>Title</Label>
                          <div className="relative">
                            <Controller
                              control={control}
                              name="title"
                              render={({ field }) => (
                                <Input {...field}
                                  value={field.value ?? ""}
                                />
                              )}
                            />
                            {errors.title && (
                              <p style={{ color: "red", margin: "0", padding: "5px" }}>
                                {errors.title.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div>
                          <Label>Author</Label>
                          <div className="relative">
                            <Controller
                              control={control}
                              name="author"
                              render={({ field }) => (
                                <Input {...field}
                                  value={userId ?? ""}
                                  disabled
                                />
                              )}
                            />
                            {errors.author && (
                              <p style={{ color: "red", margin: "0", padding: "5px" }}>
                                {errors.author.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className='mt-4'>
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
        </>
      }
    </>
  )
}

export default Blogs