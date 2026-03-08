import DashboardNavbar from "@/components/modules/Dashboard/DashboardNavbar";
import DashboardSidebard from "@/components/modules/Dashboard/DashboardSidebard";
import React from "react";

const RootDashboardlayout = async({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex">
      <DashboardSidebard />
      <div className="flex flex-1 flex-col">
        <DashboardNavbar />
        <div className="flex-1 p-4">{children}</div>
      </div>
    </div>
  );
};

export default RootDashboardlayout;
