import React, { useMemo, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, addItem, decreaseQty, clearCart } from "../features/cart/cartSlice";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import QrCode2OutlinedIcon from "@mui/icons-material/QrCode2Outlined";
import { useNavigate } from "react-router-dom";
import "../styles/Checkout.css";

import { getUserProfile } from "../api/authAPI";
import { getCustomerIdFromToken } from "../utils/jwt";


import { getCustomerPendingOrder, createOrder } from "../api/orderAPI";

import axiosInstance from "../api/axiosInstance";

import OrderCompletion from "./OrderCompletion";

const money = (n) => `₹ ${Number(n || 0).toLocaleString("en-IN")}`;


async function normalizeFoodIdsFromServer(orderItems ) {
  try {
    const res = await axiosInstance.get("/all-food-item");
    const list = Array.isArray(res?.data?.data) ? res.data.data
               : Array.isArray(res?.data) ? res.data : [];

    const byId   = new Map(list.map(f => [String(f._id), f]));
    const byName = new Map(list.map(f => [String(f.name).toLowerCase(), f]));

    const fixed = [];
    const invalid = [];

    for (const it of orderItems) {
      const idStr = typeof it.foodItem === "string" ? it.foodItem : String(it.foodItem || "");
      const isObjectId = /^[a-fA-F0-9]{24}$/.test(idStr);

      if (isObjectId && byId.has(idStr)) {
        fixed.push({ foodItem: idStr, quantity: it.quantity });
        continue;
      }
      const guess = byName.get(String(it.name || "").toLowerCase());
      if (guess?._id) {
        fixed.push({ foodItem: String(guess._id), quantity: it.quantity });
      } else {
        invalid.push(it);
      }
    }

    return { fixed, invalid };
  } catch {

    return {
      fixed: orderItems.map(({ name, ...r }) => ({ foodItem: r.foodItem, quantity: r.quantity })),
      invalid: []
    };
  }
}

export default function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);

  const [orderPlaced, setOrderPlaced] = useState(
    sessionStorage.getItem("orderPlaced") === "true"
  );

  
  const orderRef = useRef("");   


  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    line1: "",
    city: "",
    pincode: "",
  });

  
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fillFromProfile = async () => {
      try {
        const id = getCustomerIdFromToken();
        if (!id) return;
        const res = await getUserProfile(id);
        const u = res?.data || {};
        const addrs = Array.isArray(u.address) ? u.address : [];
        const addr = addrs.length ? addrs[addrs.length - 1] : null;

        setForm((prev) => ({
          ...prev,
          fullName: u.firstName ? `${u.firstName} ${u.lastName || ""}`.trim() : prev.fullName,
          phone: u.phone || prev.phone,
          email: u.email || prev.email,
          line1: addr ? `${addr.buildingNo || ""} ${addr.street || ""}`.trim() : prev.line1,
          city: addr?.city || prev.city,
          pincode: addr?.pinCode || prev.pincode,
        }));
      } catch {}
    };
    fillFromProfile();
  }, []);

  useEffect(() => {
  
    if (showSuccess) return;

    if (!items || items.length === 0) {
      const fromOrder = sessionStorage.getItem("orderPlaced") === "true";
      if (fromOrder) {
        setOrderPlaced(true);
      } else {
        navigate("/cart");
      }
    } else {
      setOrderPlaced(false);
    }
  }, [items, navigate, showSuccess]);

  const subtotal = useMemo(
    () => items.reduce((s, it) => s + (Number(it.price) || 0) * (Number(it.qty) || 0), 0),
    [items]
  );

  const discount = Math.round(subtotal * 0.256);
  const delivery = subtotal > 0 ? 50 : 0;
  const total = subtotal - discount + delivery;

  const onChange = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));


  const customerId = useMemo(() => getCustomerIdFromToken() || null, []);
  const [pendingOrder, setPendingOrder] = useState(null);
  const [poLoading, setPoLoading] = useState(false);
  const [poError, setPoError] = useState("");

  useEffect(() => {
    let cancelled = false;
    if (!customerId) return;

    (async () => {
      try {
        setPoLoading(true);
        setPoError("");
        const res = await getCustomerPendingOrder(customerId); 
        if (!cancelled) {
          const po = res?.data || null;
          setPendingOrder(po);
          orderRef.current = po?._id || ""; 
        }
      } catch (e) {
        if (!cancelled) {
          const msg = e?.response?.data?.message || e?.message || "Failed to fetch pending order.";
          setPoError(msg);
        }
      } finally {
        if (!cancelled) setPoLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [customerId]);

  
  const loadRazorpayScript = () =>
    new Promise((resolve, reject) => {
      if (window.Razorpay) return resolve(true);
      const s = document.createElement("script");
      s.src = "https://checkout.razorpay.com/v1/checkout.js";
      s.onload = () => resolve(true);
      s.onerror = () => reject(new Error("Failed to load Razorpay SDK"));
      document.body.appendChild(s);
    });

  const handlePayment = async () => {
    try {
      if (total <= 0) {
        alert("Cart is empty or total is zero.");
        return;
      }

      await loadRazorpayScript();

      const token = sessionStorage.getItem("token") || localStorage.getItem("token");
      if (!token) {
        alert("Please log in to continue with payment.");
        navigate("/auth/login");
        return;
      }

      
      const amount = Math.round(total);

     
      if (!orderRef.current) {
      
        const base = items.map((it) => {
          const rawId =
            it?._id ||
            it?.id ||
            it?.foodItem?._id ||
            it?.foodItem?.id ||
            it?.foodItem ||
            it?.dish?._id ||
            it?.dish?.id ||
            it?.dish;

          return {
            name: it?.name || it?.title || "",
            foodItem: typeof rawId === "string" ? rawId : String(rawId || ""),
            quantity: Number(it?.qty || 0),
          };
        });

       
        if (base.some(b => !Number.isInteger(b.quantity) || b.quantity <= 0)) {
          alert("Invalid item quantity in cart. Please re-add items and try again.");
          return;
        }

       
        const { fixed, invalid } = await normalizeFoodIdsFromServer(base);
        if (invalid.length) {
          alert(
            "Some items aren’t available or have invalid IDs on the server:\n" +
            invalid.map(i => `- ${i.name || i.foodItem}`).join("\n") +
            "\n\nPlease remove and re-add them from the menu, then try again."
          );
          return;
        }

        const itemsSafe = fixed; 

        
        const buildingNoSafe = (form.line1 || "").trim() || "Building";
        const streetSafe     = (form.line1 || "").trim() || "Street"; 
        const citySafe       = (form.city || "").trim();
        const pinSafe        = (form.pincode || "").toString().trim();

      
        const restaurantId =
          items?.[0]?.restaurantId ||
          items?.[0]?.restaurant?._id ||
          items?.[0]?.restaurant ||
          "";

        if (!restaurantId) {
          alert("Missing restaurant info for this cart.");
          return;
        }

        const newOrderPayload = {
          customerId,
          restaurant: restaurantId,   
          items: itemsSafe,
          buildingNo: buildingNoSafe,
          street: streetSafe,
          city: citySafe,
          pinCode: pinSafe,
        };

        try {
          const created = await createOrder(newOrderPayload); 
          const createdId = created?.data?._id || created?.data?.id || "";
          if (!createdId) {
            const msg = created?.message || "Order id missing from server response.";
            alert(`Could not create order. ${msg}`);
            return;
          }
          orderRef.current = createdId; 
        } catch (e) {
          const msg =
            e?.response?.data?.message ||
            e?.response?.data?.error ||
            e?.message ||
            "Could not create order. Please try again.";
          console.error("Failed to create order before payment:", msg, e?.response?.data);
          alert(`Create order failed: ${msg}`);
          return;
        }
      }

     
      const res = await fetch("https://spice-junction.onrender.com/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount }),
      });

      if (!res.ok) throw new Error("Failed to create payment");

      const { razorpayOptions } = await res.json();

     
      razorpayOptions.theme = razorpayOptions.theme || {};
      razorpayOptions.theme.color = razorpayOptions.theme.color || "#E53935";
      razorpayOptions.prefill = {
        name: form.fullName || undefined,
        email: form.email || undefined,
        contact: form.phone || undefined,
      };

    
      razorpayOptions.handler = async (response) => {
        try {
          const orderIdForRecord = orderRef.current; 
          if (!orderIdForRecord) {
            console.error("Missing DB OrderId in handler");
            alert("Payment saved on gateway, but recording failed on server.");
            return;
          }

         
          const verifyRes = await fetch("https://spice-junction.onrender.com/verify-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(response), 
          });

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
           
            const restaurantId =
              items?.[0]?.restaurantId ||
              items?.[0]?.restaurant?._id ||
              items?.[0]?.restaurant ||
              "";

            const recordPayload = {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,

              order: orderIdForRecord,   
              restaurant: restaurantId,  
              amount: Number(Math.round(total)),    
              customerId: customerId || getCustomerIdFromToken() || null,
            };

            const recordRes = await fetch(
              "https://spice-junction.onrender.com/create-payment-record",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(recordPayload),
              }
            );

            if (!recordRes.ok) {
              const errText = await recordRes.text().catch(() => "");
              console.error("create-payment-record failed", recordRes.status, errText);
              alert("Payment saved on gateway, but recording failed on server.");
              return;
            }

          
            sessionStorage.removeItem("orderPlaced");
            dispatch(clearCart());
            setShowSuccess(true);          
            return;                          
          } else {
            alert("Payment verification failed!");
          }
        } catch (err) {
          console.error("Verification/record error:", err);
          alert("Payment verification failed!");
        }
      };

      const rzp = new window.Razorpay(razorpayOptions);
      rzp.open();
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment could not be initiated");
    }
  };


  if (showSuccess) {
    return <OrderCompletion />;
  }

  return (
    <Box className="checkout-wrap">
      <Typography variant="h3" className="ck-title">Checkout</Typography>

      {orderPlaced && (
        <Box
          role="status"
          aria-live="polite"
          style={{
            marginBottom: 16,
            padding: 16,
            borderRadius: 12,
            background: "#E8F5E9",
            border: "1px solid #C8E6C9",
            textAlign: "center",
          }}
        >
          <Typography variant="h5" style={{ color: "#2E7D32", marginBottom: 4 }}>
             Order Placed Successfully!
          </Typography>
          <Typography variant="body1" style={{ color: "#33691E" }}>
            Thank you for ordering with Spice Junction. Your food will be delivered soon.
          </Typography>
        </Box>
      )}

      <Grid container className="ck-two-col" columnSpacing={3} rowSpacing={2}>
    
        <Grid item xs={12} md={8} className="ck-left">
          <div className="section-label">Order summary</div>

          <Card className="card order-card">
            <CardContent className="card-body">
              {items.map((it, idx) => (
                <div
                  key={(it._id || it.id) + idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 0",
                    borderBottom: idx !== items.length - 1 ? "1px solid #eee" : "none"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <img
                      src={it.image}
                      alt={it.name}
                      style={{ width: 50, height: 50, borderRadius: 6, objectFit: "cover" }}
                    />
                    <div>
                      <div style={{ fontWeight: 600 }}>{it.name}</div>
                      <div style={{ fontSize: 13, color: "#666" }}>
                        Qty: {String(it.qty || 0).padStart(2, "0")}
                      </div>
                    </div>
                  </div>
                  <div style={{ fontWeight: 600 }}>{money(it.price)}</div>
                </div>
              ))}

              {orderPlaced && items.length === 0 && (
                <Typography style={{ color: "#666", textAlign: "center", padding: "8px 0" }}>
                  Your order details were submitted successfully. We’ve cleared the cart.
                </Typography>
              )}
            </CardContent>
          </Card>

          <div className="section-label spaced">Delivery Details</div>
          <Card className="card form-card">
            <CardContent className="card-body">
              <div className="form-grid">
                <TextField size="small" label="Full Name" value={form.fullName} onChange={onChange("fullName")} />
                <TextField size="small" label="Phone" value={form.phone} onChange={onChange("phone")} />
                <TextField size="small" label="Email" value={form.email} onChange={onChange("email")} />
                <TextField size="small" label="Address Line 1" value={form.line1} onChange={onChange("line1")} />
                <TextField size="small" label="Address Line 2" sx={{ display: "none" }} />
                <div className="row-3">
                  <TextField size="small" label="City" value={form.city} onChange={onChange("city")} />
                  <TextField size="small" label="State" sx={{ display: "none" }} />
                  <TextField size="small" label="Pincode" value={form.pincode} onChange={onChange("pincode")} />
                </div>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Save this address for next time"
                  className="save-check"
                />
              </div>
            </CardContent>
          </Card>
        </Grid>

        {/* RIGHT */}
        <Grid item xs={12} md={4} className="ck-right">
          <Card className="card summary-card">
            <CardContent className="card-body">
              <div className="summary-title">Detail Summary</div>
              <div className="sum-row"><span>Subtotal</span><span>{money(subtotal)}</span></div>
              <div className="sum-row"><span>Discount</span><span>{money(discount)}</span></div>
              <div className="sum-row"><span>Delivery</span><span>{money(delivery)}</span></div>
              <Divider className="sum-divider" />
              <div className="sum-row total"><span>Total</span><span>{money(total)}</span></div>
            </CardContent>
          </Card>

          <Card className="card payment-card">
            <CardContent className="card-body">
              <div className="summary-title">Payment Method</div>
              <div className="pay-grid">
                <div className="pay-item">
                  <AttachMoneyOutlinedIcon className="pay-ico pay-cash" />
                  <div>Cash</div>
                </div>
                <div className="pay-item">
                  <CreditCardOutlinedIcon className="pay-ico pay-card" />
                  <div>Card</div>
                </div>
                <div className="pay-item">
                  <QrCode2OutlinedIcon className="pay-ico pay-upi" />
                  <div>UPI</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="right-cta">
            <Button
              variant="contained"
              className="place-btn"
              onClick={handlePayment}
            >
              do Payment
            </Button>

            <Button
              variant="contained"
              className="cancel-btn"
              onClick={() => {
                sessionStorage.removeItem("orderPlaced");
                dispatch(clearCart());
                navigate("/");
              }}
            >
              Cancel Order
            </Button>

            <button className="back-link" onClick={() => navigate("/cart")}>
              Back to Cart
            </button>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
