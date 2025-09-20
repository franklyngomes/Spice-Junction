"use client";
import React from "react";
import { useSidebar } from "../../context/SidebarContext";
import AppHeader from "../../layout/AppHeader";
import AppSidebar from "../../layout/AppSidebar";
import Backdrop from "../../layout/Backdrop";
import Provider from "../provider";
import { RestaurantByOwnerQuery } from "../../api/query/RestaurantQuery";
import { Cookies } from "react-cookie";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const cookies = new Cookies()
  const userId = cookies.get("userId")
  const { data } = RestaurantByOwnerQuery(userId, !!userId)
  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
      ? "lg:ml-[220px]"
      : "lg:ml-[90px]";

  React.useEffect(() => {
    cookies.set("restaurantId", data?.data[0]._id)
  }, [data])
  return (
    <Provider>
      <div className="min-h-screen xl:flex">
        {/* Sidebar and Backdrop */}
        <AppSidebar />
        <Backdrop />
        {/* Main Content Area */}
        <div
          className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}
        >
          {/* Header */}
          <AppHeader />
          {/* Page Content */}
          <div className="p-4 mx-auto max-w-(--breakpoint-*) md:p-6">{children}</div>
        </div>
      </div>
    </Provider>
  );
}
