"use client";
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LogOutIcon, UserIcon } from "lucide-react"
import { useRouter } from "next/navigation";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


const UserDropdownClient = ({ name }: { name: string }) => {
  const router = useRouter();
  const handleLogOut = async () => {
    await fetch(`${BASE_API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
    router.refresh();
    router.push("/login");
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} size={"icon"} className="rounded-full">
          <span className="text-sm font-semibold">
            {name.charAt(0).toUpperCase()}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <UserIcon />
          Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogOut} variant="destructive" className="cursor-pointer" >
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserDropdownClient