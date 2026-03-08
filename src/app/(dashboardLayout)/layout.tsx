import DashboardNavbar from "@/components/modules/Dashboard/DashboardNavbar";
import DashboardSidebard from "@/components/modules/Dashboard/DashboardSidebard";
import React from "react";

const RootDashboardlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex gap-2">
      <DashboardSidebard />
      <div className="flex flex-1 flex-col">
        <DashboardNavbar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default RootDashboardlayout;
