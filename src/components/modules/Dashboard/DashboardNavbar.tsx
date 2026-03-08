import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";
import UserDropdown from "./UserDropdown";


const DashboardNavbar = () => {
  return (
    <div className="flex items-center gap-4 h-13 border-b p-4">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input type="text" placeholder="Search..." className="ps-9 pe-3" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <NotificationDropdown />
        <UserDropdown />
      </div>
    </div>
  );
};

export default DashboardNavbar;
