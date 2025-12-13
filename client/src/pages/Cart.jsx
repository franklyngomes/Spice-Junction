import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  addItem,
  decreaseQty,
  removeItem,
  clearCart,
} from "../features/cart/cartSlice";

import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import "../styles/Cart.css";

import { createOrder } from "../api/orderAPI";
import axios from "../api/axiosInstance";
import { getUserProfile } from "../api/authAPI";
import { getCustomerIdFromToken } from "../utils/jwt";

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);

  const [addressFromProfile, setAddressFromProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);

  
  useEffect(() => {
    const loadAddress = async () => {
      try {
        const userId = getCustomerIdFromToken();
        if (!userId) return;

        setProfileLoading(true);
        const res = await getUserProfile(userId);
        const user = res?.data || {};
        const addresses = Array.isArray(user.address) ? user.address : [];
        const preferred = addresses.length ? addresses[addresses.length - 1] : null;

        if (preferred) {
          setAddressFromProfile({
            name: `${user.firstName || "Customer"} ${user.lastName || ""}`.trim(),
            buildingNo: preferred.buildingNo || "",
            street: preferred.street || "",
            city: preferred.city || "",
            pinCode: preferred.pinCode || "",
            email: user.email || "",
            phone: user.phone || "",
          });
        } else {
          setAddressFromProfile(null);
        }
      } catch {
        setAddressFromProfile(null);
      } finally {
        setProfileLoading(false);
      }
    };

    loadAddress();
  }, []);

  const total = items.reduce(
    (sum, it) => sum + (Number(it.price) || 0) * (Number(it.qty) || 0),
    0
  );
  const money = (n) => `₹ ${Number(n || 0).toLocaleString("en-IN")}`;

  if (!items || items.length === 0) {
    return (
      <Box className="cart-container">
       
        <button
          onClick={() => {
            const rid = sessionStorage.getItem("lastRestaurantId");
            navigate(rid ? `/restaurant-details/${rid}` : "/");
          }}
          style={{
            background: "none",
            border: 0,
            color: "#d32f2f",
            fontWeight: 600,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 6,
            fontSize: "1rem",
          }}
        >
          <ArrowBackIosNewIcon fontSize="small" style={{ color: "#d32f2f" }} />
          Back to Home
        </button>

        <Typography variant="h3" className="cart-title">Your Order</Typography>
        <Card className="empty-card">
          <CardContent>
            <Typography variant="h6">Your cart is empty</Typography>
            <Typography className="muted">Add some tasty dishes from the menu!</Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }


  const address = addressFromProfile
    ? {
        name: addressFromProfile.name || "Customer",
        line1: `${addressFromProfile.buildingNo}, ${addressFromProfile.street}`,
        line2: `${addressFromProfile.city} - ${addressFromProfile.pinCode}`,
        email: addressFromProfile.email || "",
        phone: addressFromProfile.phone || "",
      }
    : null;

  const isMongoId = (v) => typeof v === "string" && /^[a-f\d]{24}$/i.test(v);
  const isPositiveInt = (n) => Number.isInteger(n) && n > 0;

  
  const normalizeFoodIds = async (orderItems) => {
    try {
      const res = await axios.get("/all-food-item");
      const list = Array.isArray(res?.data?.data) ? res.data.data
                 : Array.isArray(res?.data) ? res.data : [];
      const byId = new Map(list.map(f => [String(f._id), f]));
      const byName = new Map(list.map(f => [String(f.name).toLowerCase(), f]));

      const invalid = [];
      const fixed = orderItems.map(oi => {
        if (oi.foodItem && byId.has(String(oi.foodItem))) return oi;
        const guess = byName.get(String(oi._debugName || "").toLowerCase());
        if (guess?._id) return { ...oi, foodItem: String(guess._id) };
        invalid.push(oi);
        return oi;
      });

      return { fixed, invalid };
    } catch {
      return { fixed: orderItems, invalid: orderItems };
    }
  };

  const handlePlaceOrder = async () => {
    const customerId = getCustomerIdFromToken();
    if (!customerId) {
      alert("Please login to place the order.");
      navigate("/auth");
      return;
    }

    if (!addressFromProfile) {
      const go = window.confirm(
        "You don’t have a saved delivery address.\nAdd one in your profile now?"
      );
      if (go) {
        navigate(`/user-profile/${customerId}`);
      }
      return;
    }

    const baseItems = items.map((it) => ({
      foodItem: it._id,
      quantity: Number(it.qty) || 1,
      _debugName: it.name
    }));

    if (baseItems.some(i => !isPositiveInt(i.quantity))) {
      alert("Quantity must be a positive whole number.");
      return;
    }

    const { fixed, invalid } = await normalizeFoodIds(baseItems);
    const badAfterFix = fixed.filter(i => !isMongoId(i.foodItem));
    if (invalid.length || badAfterFix.length) {
      alert("Some items don’t have valid Food IDs. Please Clear Cart and add again.");
      return;
    }

    const orderItems = fixed.map(({ _debugName, ...rest }) => rest);

  
    const restaurantId =
      items?.[0]?.restaurantId ||
      items?.[0]?.restaurant?._id ||
      items?.[0]?.restaurant ||
      null;

    if (!restaurantId) {
      alert("Missing restaurant info for this cart. Please re-add items.");
      return;
    }

   
   const payload = {
  customerId,
  restaurant: restaurantId,    
  items: orderItems,
  buildingNo: addressFromProfile.buildingNo,
  street: addressFromProfile.street || "Street",
  city: addressFromProfile.city,
  pinCode: addressFromProfile.pinCode,
};


    try {
      setPlacing(true);
      const res = await createOrder(payload);
      if (res?.status) {
        alert(res?.message || "Order placed successfully!");
        sessionStorage.setItem("orderPlaced", "true");
        navigate("/checkout");
      } else {
        alert(res?.message || "Failed to place order. Please try again.");
      }
    } catch (err) {
      const status = err?.response?.status;
      const msg = err?.response?.data?.message || err?.message || "Something went wrong";
      if (status === 401) {
        alert("Session expired / unauthorized. Please login again.");
        navigate("/auth");
      } else {
        alert(`Order failed: ${msg}`);
      }
    } finally {
      setPlacing(false);
    }
  };

  return (
    <Box className="cart-container">
     
      <button
        onClick={() => {
          const rid = sessionStorage.getItem("lastRestaurantId");
          navigate(rid ? `/restaurant-details/${rid}` : "/");
        }}
        style={{
          background: "none",
          border: 0,
          color: "#d32f2f",
          fontWeight: 600,
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 6,
          fontSize: "1rem",
        }}
      >
        <ArrowBackIosNewIcon fontSize="small" style={{ color: "#d32f2f" }} />
        Back to Home
      </button>

     
      <Typography variant="h3" className="cart-title">Your Order</Typography>

      <Box className="order-list">
        {items.map((it) => (
          <Grid
            key={it._id || it.id}
            container
            alignItems="center"
            className="item-row"
          >
            <Grid item>
              <img src={it.image} alt={it.name} className="item-img" />
            </Grid>

            <Grid item xs className="item-info">
              <Typography className="item-name">{it.name}</Typography>
            
              <Typography className="item-price">
                {money(it.price)} * {String(it.qty || 0).padStart(2, "0")}
              </Typography>
            </Grid>

            <Grid item className="qty-actions">
              <div className="qty-stepper">
                <IconButton
                  size="small"
                  className="step-btn"
                  aria-label="decrease"
                  onClick={() => dispatch(decreaseQty(it))}
                >
                  <RemoveRoundedIcon />
                </IconButton>

                <span className="qty-text">
                  {String(it.qty || 0).padStart(2, "0")}
                </span>

                <IconButton
                  size="small"
                  className="step-btn"
                  aria-label="increase"
                  onClick={() => dispatch(addItem(it))}
                >
                  <AddRoundedIcon />
                </IconButton>
              </div>

              <button
                className="remove-btn"
                onClick={() => dispatch(removeItem(it))}
              >
                Remove
              </button>
            </Grid>
          </Grid>
        ))}
      </Box>

      <Grid container alignItems="baseline" className="section-header">
        <Grid item xs>
          <Typography className="section-title">Delivery Address</Typography>
        </Grid>
        <Grid item className="address-actions">
          {!addressFromProfile && (
            <button
              className="link-btn"
              onClick={() => {
                const uid = getCustomerIdFromToken();
                navigate(uid ? `/user-profile/${uid}` : "/auth");
              }}
            >
              + Add address
            </button>
          )}
          <button
            className="link-btn"
            onClick={() => {
              const uid = getCustomerIdFromToken();
              navigate(uid ? `/user-profile/${uid}` : "/auth");
            }}
          >
            Edit
          </button>
        </Grid>
      </Grid>

      <Card className="address-card">
        <CardContent className="address-card-content">
          {address ? (
            <>
              <Typography className="addr-name">{address.name}</Typography>
              <Typography className="addr-line">{address.line1}</Typography>
              <Typography className="addr-line">{address.line2}</Typography>

              <div className="addr-meta">
                {address.email && <span className="email-chip">{address.email}</span>}
                {address.phone && <span className="phone-text">{address.phone}</span>}
              </div>
            </>
          ) : (
            <Typography className="muted">
              {profileLoading
                ? "Loading your address..."
                : "No saved address found. Please add one in your profile."}
            </Typography>
          )}
        </CardContent>
      </Card>

      <Card className="total-card">
        <CardContent className="total-card-content">
          <div className="total-left">
            <Typography className="total-title">Total Bill</Typography>
            <Typography className="muted small">
              Incl. taxes, charges &amp; donation
            </Typography>
          </div>
          <Typography className="total-amount">{money(total)}</Typography>
        </CardContent>
      </Card>

      <Divider className="divider-spacer" />

      <div className="footer-bar">
        <Button
          variant="contained"
          className="checkout-btn"
          onClick={handlePlaceOrder}
          disabled={placing}
        >
          {placing ? "Placing..." : "Place Order"}
        </Button>
        <Button
          variant="text"
          className="clear-btn"
          onClick={() => dispatch(clearCart())}
        >
          Clear Cart
        </Button>
      </div>
    </Box>
  );
}

