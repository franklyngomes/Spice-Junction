export interface SigninData {
  email: string,
  password: string,
}
export interface SignupData {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  phone: string,
}
export interface ForgotPasswordData {
  email: string,
}
export interface ResetPasswordData {
  email: string,
  code: string,
  newPassword: string
}
export interface VerifyEmailResponse {
  data: {
    status: boolean
    message: string
  }
  response?: {
    data: {
      message: string,
      status: string
    }
  }
}
export interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string,
  role: string;
  address?: string[]
}

export interface StoreState {
  isEditing: boolean,
  editId: string,
  setIsEditing: (value: boolean) => void;
  setEditId: (id: string) => void;
  user: UserProfile | null
  setUser: (value: UserProfile) => void
}
export interface FoodMenuData {
  name: string,
  restaurant: string
}
export interface FoodMenuItem {
  createdAt?: string
  items?: []
  name: string
  restaurant: string
  updatedAt?: string
  __v?: number
  _id: string
}
export interface FoodMenuResponse {
  data?: FoodMenuItem[],
  error?: boolean,
  message?: string,
}
export interface FoodItem {
  createdAt?: string,
  description: string,
  image: string,
  isAvailable: boolean
  menu: {
    name: string
  },
  name: string,
  price: number
  restaurant: string,
  subCategory: string,
  updatedAt?: string,
  __v: number,
  _id: string,
}
export interface FoodItemDetailsResponse{
  data?:{
    createdAt?: string,
  description: string,
  image: string,
  isAvailable: boolean
  menu?: {
    name?: string,
    _id?: string,
  },
  name: string,
  price: number
  restaurant: string,
  subCategory?: {
    _id?:string,
    name?:string,
  },
  updatedAt?: string,
  __v: number,
  _id: string,
  },
  error?: boolean,
  message?: string,
}
export interface FoodItemResponse {
  data?: FoodItem[],
  error?: boolean,
  message?: string,
}
export interface FoodItemData {
  name: string,
  description: string,
  restaurant: string,
  subCategory: string,
  price: number,
  menu: string,
  image: File | string | null
}
export interface SubCategory {
  category: string[]
  categoryNo: string,
  createdAt?: string,
  image: string,
  items?: []
  name: string,
  updatedAt?: string,
  __v?: number,
  _id: string,
}
export interface SubCategoryResponse{
  data?: SubCategory[],
  error?: boolean,
  message?: string,
}
export interface SubCategoryData{
  name?: string,
  image?: string,
  category?: string,

}