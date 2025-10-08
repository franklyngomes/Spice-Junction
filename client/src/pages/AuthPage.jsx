// src/pages/AuthPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import AuthSlide from "../components/AuthSlide";

export default function AuthPage() {
  const { mode } = useParams(); // "login" | "signup" | undefined
  const initialMode = mode === "signup" ? "signup" : "login";
  return <AuthSlide initialMode={initialMode} />;
}
