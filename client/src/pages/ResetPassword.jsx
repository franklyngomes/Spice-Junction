import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordThunk } from "../features/auth/authSlice";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [sp] = useSearchParams();
  const token = sp.get("token");
  const [password, setPassword] = useState("");
  const { loading, error, message } = useSelector(s => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    dispatch(resetPasswordThunk({ token, newPassword: password }))
      .unwrap()
      .then(() => navigate("/auth/login"));
  };

  return (
    <div style={{ minHeight:"100vh", display:"grid", placeItems:"center" }}>
      <form onSubmit={submit} style={{ width:360 }}>
        <h2>Reset password</h2>
        <input type="password" placeholder="New password" value={password}
               onChange={(e)=>setPassword(e.target.value)} style={{ width:"100%", padding:10, margin:"12px 0" }}/>
        <button disabled={loading} style={{ width:"100%", padding:10 }}>
          {loading ? "Changing..." : "Change password"}
        </button>
        <p style={{ color: error ? "#c62828" : "#2e7d32" }}>{error || message}</p>
      </form>
    </div>
  );
}
