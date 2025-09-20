export const endPoints = {
  foodmenu: {
    create_food_menu: "/create-food-menu",
    all_food_menu: "/all-food-menu",
    food_menu_details:"/food-menu-details/",
    restaurant_food_menu: "/restaurant-food-menu/",
    delete_food_menu: "/delete-food-menu/",
    update_food_menu: "/update-food-menu/"
  },
  restaurant: {
    restaurant_by_owner: "/restaurant-by-owner/"
  },
  appointments: {
    appointment_create: "/appointment-create",
    appointment_list: "/all-appointment",
    appointment_details: "/appointment-details/",
    appointment_update: "/appointment-update/",
    appointment_delete: "/appointment-delete/",
    appointment_group: "/appointment-group/"
  },
  patients: {
    patient_create: "/patient-create",
    patient_list: "/all-patients",
    patient_details: "/patient-details/",
    patient_update: "/patient-update/",
    patient_delete: "/patient-delete/"
  },
  doctors: {
    doctor_create: "/doctor-create",
    doctor_list: "/all-doctor",
    doctor_details: "/doctor-details/",
    doctor_update: "/doctor-update/",
    doctor_delete: "/doctor-delete/"
  },
  rooms: {
    room_create: "/room-create",
    room_list: "/all-room",
    room_details: "/room-details/",
    room_update: "/room-update/",
    room_delete: "/room-delete/"
  },
  auth: {
    adminsignup: "/admin/signup",
    restaurantsignup: "/restaurant/signup",
    verifyEmail: "/verify-email/",
    signin: "/signin",
    forgot_password: "/forgot-password",
    reset_password: "/reset-password"
  },
  generateBill: "/generate",
  previewBill: "/preview",
  userProfile: "/user-profile/"
}