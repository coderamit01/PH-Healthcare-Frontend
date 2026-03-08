import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"


const UserDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} size={"icon"} className="rounded-full">
          <span className="text-sm font-semibold">
            {"Amit".charAt(0).toUpperCase()}
          </span>
        </Button>
      </DropdownMenuTrigger>
    </DropdownMenu>
  )
}

export default UserDropdown