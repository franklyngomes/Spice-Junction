export interface Patient {
  _id: string;
  name: string;
  phone: string;
  address: string;
  bloodType: string;
  gender: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}
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
export interface ForgotPasswordData{
  email: string,
}
export interface ResetPasswordData{
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
export interface Doctor {
  _id: string;
  name: string;
  phone: string;
  email: string;
  image: string;
  specialization: string;
  status: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface AppointmentListProps {
  patientId: Patient;
  note: string;
  doctorId: Doctor;
  appointmentDate: Date;
  status?: string;
  _id: string;
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