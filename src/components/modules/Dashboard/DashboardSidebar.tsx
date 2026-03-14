import { getDefaultDashboardRoute } from "@/lib/authUtils";
import { getNavItemsByRole } from "@/lib/navItems";
import { getUserInfo } from "@/services/auth.service";
import { navSection } from "@/types/dashboard.type";
import { UserInfo } from "@/types/user.type";
import { DashboardSidebarContent } from "./DashboardSidebarContent";


const DashboardSidebar = async () => {
  const userInfo: UserInfo = await getUserInfo();
  const navItems: navSection[] = getNavItemsByRole(userInfo.role);
  const dashboardHome: string = getDefaultDashboardRoute(userInfo.role);

  return (
    <DashboardSidebarContent  userInfo={userInfo} navItems={navItems} dashboardHome={dashboardHome}  />
  );
};

export default DashboardSidebar;
