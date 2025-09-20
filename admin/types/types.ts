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