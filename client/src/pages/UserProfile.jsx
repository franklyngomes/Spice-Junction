import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getUserProfile,
  setUserAddress,
  deleteUserAddress,
  updateUserAddress
} from "../api/authAPI";
import "../styles/Profile.css";

const emptyForm = { buildingNo: "", street: "", city: "", pinCode: "" };

export default function UserProfile() {
  const { id: userId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [user, setUser] = useState(null);

  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);

  const load = async () => {
    setLoading(true);
    setErr("");
    try {
      const res = await getUserProfile(userId);
      if (res?.status) setUser(res.data);
      else setErr(res?.message || "Failed to load profile");
    } catch (e) {
      setErr(e?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [userId]);

  const initial = (user?.firstName?.[0] || user?.lastName?.[0] || user?.email?.[0] || "?").toUpperCase();

  const onChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const startAdd = () => { setEditingAddressId(null); setForm(emptyForm); };
  const startEdit = (addr) => {
    setEditingAddressId(addr._id);
    setForm({
      buildingNo: addr.buildingNo || "",
      street: addr.street || "",
      city: addr.city || "",
      pinCode: addr.pinCode || ""
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const cancelEdit = () => { setEditingAddressId(null); setForm(emptyForm); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.buildingNo || !form.street || !form.city || !form.pinCode) {
      alert("Please fill all fields.");
      return;
    }
    setSubmitting(true);
    setErr("");
    try {
      if (editingAddressId) {
        let updated = false;
        try {
          const up = await updateUserAddress(editingAddressId, form);
          if (up?.status) updated = true;
        } catch {}
        if (!updated) {
          await deleteUserAddress(editingAddressId);
          await setUserAddress(userId, form);
        }
      } else {
        await setUserAddress(userId, form);
      }
      await load();
      setForm(emptyForm);
      setEditingAddressId(null);
    } catch (e2) {
      setErr(e2?.response?.data?.message || "Failed to save address");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (addressId) => {
    if (!window.confirm("Delete this address?")) return;
    setSubmitting(true);
    setErr("");
    try {
      await deleteUserAddress(addressId);
      await load();
      if (editingAddressId === addressId) cancelEdit();
    } catch (e) {
      setErr(e?.response?.data?.message || "Failed to delete address");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div style={{ marginTop: 120, padding: 16 }}>Loading profile…</div>;
  if (err) return <div style={{ marginTop: 120, padding: 16, color: "crimson" }}>{err}</div>;

  return (
    <div className="user-profile-page">

     
      <div className="up-header">
        <h2 className="up-title">
          <span className="up-avatar">{initial}</span>
          User Profile
        </h2>
        <button
          className="up-secondary"
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </button>
      </div>

      
      <div className="up-card">
        <p><strong>First Name:</strong> {user?.firstName || "-"}</p>
        <p><strong>Last Name:</strong> {user?.lastName || "-"}</p>
        <p><strong>Email:</strong> {user?.email || "-"}</p>
        <p><strong>Phone:</strong> {user?.phone || "-"}</p>
        <p><strong>Role:</strong> {user?.role || "-"}</p>
      </div>

      
      <div className="up-card">
        <h3 className="up-subtitle">{editingAddressId ? "Edit Address" : "Add Address"}</h3>

        <form onSubmit={handleSubmit} className="up-form">
          <label>
            Building No
            <input
              type="text"
              name="buildingNo"
              value={form.buildingNo}
              onChange={onChange}
              required
            />
          </label>

          <label>
            Street
            <input
              type="text"
              name="street"
              value={form.street}
              onChange={onChange}
              required
            />
          </label>

          <label>
            City
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={onChange}
              required
            />
          </label>

          <label>
            Pin Code
            <input
              type="text"
              name="pinCode"
              value={form.pinCode}
              onChange={onChange}
              required
            />
          </label>

          <div className="up-actions">
            <button type="submit" disabled={submitting} className="btn up-primary">
              {editingAddressId ? "Save Changes" : "Add Address"}
            </button>
            {editingAddressId && (
              <button type="button" onClick={cancelEdit} disabled={submitting} className="up-secondary">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

     
      <div className="up-card">
        <div className="up-list-head">
          <h3>Addresses</h3>
          <button type="button" onClick={startAdd} className="up-secondary" title="Add a new address">
            + Add New
          </button>
        </div>

        {Array.isArray(user?.address) && user.address.length > 0 ? (
          <ul className="up-list">
            {user.address.map((a) => (
              <li key={a._id}>
                <div className="up-list-line">
                  {a.buildingNo} {a.street}, {a.city} - {a.pinCode}
                </div>
                <div className="up-row-actions">
                  <button type="button" onClick={() => startEdit(a)} className="up-secondary">Edit</button>
                  <button
                    type="button"
                    onClick={() => handleDelete(a._id)}
                    disabled={submitting}
                    className="up-danger"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ marginTop: 12 }}>No addresses yet.</p>
        )}
      </div>
    </div>
  );
}
