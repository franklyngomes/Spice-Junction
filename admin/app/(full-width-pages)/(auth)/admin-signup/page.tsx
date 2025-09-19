"use client"
import Link from "next/link";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Label from "../../../../components/form/Label";
import Input from "../../../../components/form/input/InputField";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../../../icons";
import { AdminSignupQuery } from "../../../../api/query/AuthQuery";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";


interface SignupFormProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const schema = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required").min(8).max(15),
  phone: yup.string()
    .required("Phone number required")
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, "too short")
    .max(10, "too long"),
});
export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const { handleSubmit, reset, control, formState: { errors, isSubmitting } } = useForm({ resolver: yupResolver(schema) });
  const { mutateAsync } = AdminSignupQuery()
  const router = useRouter()
  
   const onSubmit = async (data: SignupFormProps) => {
    const { firstName, lastName, email, password, phone } = data
    const payload = {
      firstName,
      lastName,
      email,
      password,
      phone
    }
    mutateAsync(payload, {
      onSuccess: (res) => {
        if (res.error) {
          toast.error(res.message);
          return;
        }
        toast.success(res?.message);
        reset()
        router.push('/signin')
      },
    })
  }
  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full overflow-y-auto no-scrollbar">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="w-full max-w-md sm:pt-10 mx-auto mb-5">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <ChevronLeftIcon />
              Back to dashboard
            </Link>
          </div>
          <div className="mb-5 sm:mb-8 flex justify-between items-center">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Create a new admin
            </h1>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* <!-- First Name --> */}
                  <div className="sm:col-span-1">
                    <Label>
                      First Name<span className="text-error-500">*</span>
                    </Label>
                    <Controller
                      control={control}
                      name="firstName"
                      render={({ field }) => (
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          placeholder="Enter First Name"
                        />
                      )}
                    />
                    {
                      errors.firstName && (
                        <p style={{ color: "red", margin: "0", padding: "5px" }}>
                          {errors.firstName.message}
                        </p>
                      )
                    }
                  </div>
                  {/* <!-- Last Name --> */}
                  <div className="sm:col-span-1">
                    <Label>
                      Last Name<span className="text-error-500">*</span>
                    </Label>
                    <Controller
                      control={control}
                      name="lastName"
                      render={({ field }) => (
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          placeholder="Enter Last Name"
                        />
                      )}
                    />
                    {errors.lastName && (
                      <p style={{ color: "red", margin: "0", padding: "5px" }}>
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <Label>
                      Email<span className="text-error-500">*</span>
                    </Label>
                    <Controller
                      control={control}
                      name="email"
                      render={({ field }) => (
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          placeholder="Enter Email"
                        />
                      )}
                    />
                    {errors.email && (
                      <p style={{ color: "red", margin: "0", padding: "5px" }}>
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>
                      Password<span className="text-error-500">*</span>
                    </Label>
                    <div className="relative">
                      <Controller
                        control={control}
                        name="password"
                        render={({ field }) => (
                          <Input
                            {...field}
                            value={field.value ?? ""}
                            placeholder="Enter your password"
                            type={showPassword ? "text" : "password"}
                          />
                        )}
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                      >
                        {showPassword ? (
                          <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                        ) : (
                          <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                        )}
                      </span>
                    </div>
                    {errors.password && (
                      <p style={{ color: "red", margin: "0", padding: "5px" }}>
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>Phone<span className="text-error-500">*</span></Label>
                    <div className="relative">
                      <Controller
                        control={control}
                        name="phone"
                        render={({ field }) => (
                          <Input {...field}
                            value={field.value ?? ""}
                            placeholder="Enter Phone No."
                          />
                        )}
                      />
                    </div>
                    {errors.phone && (
                      <p style={{ color: "red", margin: "0", padding: "5px" }}>
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* <!-- Button --> */}
                <div>
                  <button type="submit" disabled={isSubmitting} className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600">
                    {isSubmitting ? "Submitting..." : "Sign Up"}
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Already have an account?
                <Link
                  href="/signin"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400 ml-2"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
