export const ROLES = {
  ADMIN: "admin",
  RESTAURANT: "restaurant",
  CUSTOMER: "customer",
};

export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    "create_admin",
    "view_restaurant_request",
    "delete_restaurant",
    "update_restaurant",

    "create_category",
    "update_category",
    "delete_category",

    "add_delivery_zone",
    "delete_delivery_zone",

    "view_order",
    "delete_order",

    "block_users",
    "view_payment",   

    "create_blog",
    "update_blog",
    "delete_blog",
  ],
  [ROLES.RESTAURANT]: [
    "create_restaurant",
    "update_restaurant",

    "create_menu",
    "update_menu",
    "delete_menu",

    "create_food_item",
    "update_food_item",
    "delete_food_item",

    "view_order",
    "update_order",
    "view_payment"
  ],
  [ROLES.CUSTOMER]: [
    "create_order",
    "view_order",
    "create_blog",
    "make_payment"
  ],
};
