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
    name: string,
    _id: string
  },
  name: string,
  price: number
  restaurant: string,
  subCategory: string,
  updatedAt?: string,
  __v: number,
  _id: string,
}
export interface FoodItemDetailsResponse {
  data?: {
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
      _id?: string,
      name?: string,
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
  category: {
    name: string,
    _id: string
  }
  categoryNo: string,
  createdAt?: string,
  image: File | string | null,
  items?: []
  name: string,
  updatedAt?: string,
  __v?: number,
  _id: string,
}
export interface SubCategoryResponse {
  data?: SubCategory[],
  error?: boolean,
  message?: string,
}
export interface SubCategoryDetailsResponse {
  data?: SubCategory,
  error?: boolean,
  message?: string,
}
export interface SubCategoryData {
  name: string,
  image: File | string | null,
  category: string,
}
export interface CategoryData {
  name: string;
}
export interface CategoryItem {
  name: string,
  categoryId: string,
  createdAt?: string,
  items?: []
  updatedAt?: string,
  __v?: number,
  _id: string,
}
export interface CategoryResponse {
  data?: CategoryItem[],
  error?: boolean,
  message?: string,
}
export interface DeliveryZoneItem {
  createdAt: string,
  district: string,
  division: string,
  pinCodeList: string[],
  state: string
  updatedAt: string,
  zoneName: string,
  __v: number
  _id: string
}
export interface DeliveryZoneResponse {
  data?: DeliveryZoneItem[],
  error?: boolean,
  message?: string,
}
export interface DeliveryZoneData {
  zoneName: string,
  district: string
}
export interface RestaurantData {
  buildingNo: string,
  street: string,
  city: string,
  pinCode: string
  cuisine: string[],
  deliveryZone: string[],
  image: File | string | null,
  name: string,
  ownerId: string,
  phone: string
}
export interface RestaurantItem {
  address: {
    buildingNo: string,
    street: string,
    city: string,
    pinCode: string
  }
  createdAt?: string,
  cuisine: string[],
  deliveryZone: string[],
  image: string,
  imageId?: string,
  isApproved: boolean,
  isBlocked: boolean,
  name: string,
  ownerId: string,
  phone: string
  updatedAt?: string,
  __v?: number,
  _id: string,
}
export interface RestaurantDetailsResponse {
  data?: {
    address: {
    buildingNo: string,
    street: string,
    city: string,
    pinCode: string
  }
  createdAt?: string,
  cuisine: string[],
  deliveryZone: string[],
  image: string,
  imageId?: string,
  isApproved: boolean,
  isBlocked: boolean,
  name: string,
  ownerId: string,
  phone: string
  updatedAt?: string,
  __v?: number,
  _id: string,
  },
  error?: boolean,
  message?: string,
}
export interface RestaurantResponse {
  data?: RestaurantItem[],
  error?: boolean,
  message?: string,
}
export interface RequestData {
  isApprovedStatus?: string,
  response?: boolean
}
export interface RestaurantUpdateData {
  isApprovedStatus?: string,
  isBlockedStatus?:string,
  isApproved?: boolean,
  isBlocked?:boolean,
  buildingNo?: string,
  street?: string,
  city?: string,
  pinCode?: string
  cuisine?: string[],
  deliveryZone?: string[],
  image?: File | string | null,
  name?: string,
  ownerId?: string,
  phone?: string
}
