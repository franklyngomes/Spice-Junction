// src/components/PendingOrderPanel.jsx
import React, { useEffect, useMemo, useState } from "react";
import { getCustomerPendingOrder } from "../api/orderAPI";
import { getCustomerIdFromToken, getJwtPayload } from "../utils/jwt";

const decodeJwtFallback = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch {
    return null;
  }
};

export default function PendingOrderPanel({ className }) {
  const [pendingOrder, setPendingOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  
  const token = useMemo(
    () => sessionStorage.getItem("token") || localStorage.getItem("token"),
    []
  );

  const customerId = useMemo(() => {
    if (!token) return null;

    
    if (typeof getCustomerIdFromToken === "function") {
      try {
        const id =
          getCustomerIdFromToken.length > 0
            ? getCustomerIdFromToken(token)
            : getCustomerIdFromToken();
        if (id) return id;
      } catch {}
    }

    if (typeof getJwtPayload === "function") {
      try {
        const p =
          getJwtPayload.length > 0 ? getJwtPayload(token) : getJwtPayload();
        if (p?._id) return p._id;
      } catch {}
    }

    const p2 = decodeJwtFallback(token);
    return p2?._id || null;
  }, [token]);

  useEffect(() => {
    let cancelled = false;
    if (!customerId) {
      setErr("Please sign in to view pending orders.");
      return;
    }
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const res = await getCustomerPendingOrder(customerId);
        if (!cancelled) setPendingOrder(res?.data || null);
      } catch (e) {
        if (!cancelled) {
          const msg =
            e?.response?.data?.message ||
            e?.message ||
            "Failed to fetch pending order.";
          setErr(msg);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [customerId]);

  return (
    <div className={className} style={{ marginTop: 16 }}>
      {loading && <div>Loading your pending order…</div>}
      {err && <div style={{ color: "crimson" }}>{err}</div>}

      {pendingOrder && (
        <div>
          <h4>Pending Order</h4>
          <div>Order Id: {pendingOrder._id}</div>
          <div>Status: {pendingOrder.status}</div>

          {Array.isArray(pendingOrder.items) && pendingOrder.items.length > 0 && (
            <ul style={{ marginTop: 8 }}>
              {pendingOrder.items.map((it) => (
                <li key={it._id || `${it.foodItem}-${it.quantity}`}>
                  {(it.name || it.foodName || it.foodItem || "Item")} × {it.quantity}
                  {typeof it.price !== "undefined" ? ` — ₹${it.price}` : ""}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
