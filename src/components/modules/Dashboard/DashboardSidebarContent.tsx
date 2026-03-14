"use client"
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { getIconComponent } from "@/lib/iconMapper";
import { cn } from "@/lib/utils";
import { navSection } from "@/types/dashboard.type";
import { UserInfo } from "@/types/user.type";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardSidebarContentProps {
  userInfo: UserInfo,
  navItems: navSection[],
  dashboardHome: string,

}

export const DashboardSidebarContent = ({ dashboardHome, navItems, userInfo }: DashboardSidebarContentProps) => {
  const pathname = usePathname();
  return (
    <div className="hidden md:flex flex-col h-full w-64 border-r bg-card overflow-y-auto ps-2 pb-2">
      <div className="h-13 border-b flex justify-center items-center">
        <span className="text-xl font-bold text-primary">PH Healthcare</span>
      </div>
      <ScrollArea className="flex-1">
        <nav className="space-y-6">
          {
            navItems.map((section, sectionId) => (
              <div key={sectionId}>
                {section.title && (
                  <h4 className="mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {section.title}
                  </h4>
                )}
                <div className="space-y-1">
                  {
                    section.items.map((item, id) => {
                      const isActive = pathname === item.href;
                      const Icon = getIconComponent(item.icon as string);

                      return (
                        <Link
                          href={item.href}
                          key={id}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                          )}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{item.title}</span>
                        </Link>
                      )
                    })
                  }
                </div>
                {sectionId < navItems.length - 1 && (
                  <Separator className="my-4" />
                )}
              </div>
            ))
          }
        </nav>
      </ScrollArea>
      <div className="flex items-center gap-2 pb-3">
        <div className="h-10 w-10 rounded-full bg-primary/40 text-sm font-semibold text-white flex items-center justify-center ">{userInfo.name.charAt(0).toUpperCase()}</div>
        <div className="flex flex-col flex-1">
          <span className="text-sm font-semibold truncate">{userInfo.name}</span>
          <span className="text-xs">{userInfo.role.toLocaleLowerCase().replace("_", " ")}</span>
        </div>
      </div>
    </div>
  )
}
