import { ScrollArea } from "@/components/ui/scroll-area";


const DashboardSidebard = () => {
  return (
    <div className="hidden md:flex flex-col h-full w-64 border-r bg-card overflow-y-auto ps-2 pb-2">
      <div className="h-13 border-b flex justify-center items-center">
         <span className="text-xl font-bold text-primary">PH Healthcare</span>
      </div>
      <ScrollArea className="flex-1">
        sdf
      </ScrollArea>
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-full bg-primary/40 text-sm font-semibold text-white flex items-center justify-center ">AM</div>
        <div className="flex flex-col flex-1">
            <span className="text-sm font-semibold truncate">Dashboard Sidebar</span>
            <span className="text-xs">Role</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebard;
