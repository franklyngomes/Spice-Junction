const ROLES = {
  ADMIN: "admin",
  RESTAURANT: "restaurant",
  CUSTOMER: "customer",
};

const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    "create_admin",
    "approve_restaurant",
    "block_restaurant",
    "delete_restaurant",

    "create_category",
    "update_category",
    "delete_category",

    "add_delivery_zone",
    "update_delivery_zone",
    "delete_delivery_zone",

    "view_order",
    "delete_order",

    "create_payment_log",
    "update_payment_log",
    "delete_payment_log",
    "view_payment_log",

    "block_users",
    "delete_invoice",
    "view_invoice",

    "create_blog",
    "update_blog",
    "delete_blog",
  ],
  [ROLES.RESTAURANT]: [
    "approve_order",
    "create_food_item",
    "update_food_item",
    "delete_food_item",
    "view_payment_log",
    "update_payment_log",
  ],
  [ROLES.CUSTOMER]: [
    "create_order",
    "view_order",
    "create_payment_log",
    "view_payment_log",
    "create_blog",
    "update_blog",
    "delete_blog",
  ],
};
