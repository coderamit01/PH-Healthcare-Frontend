
import { getUserInfo } from "@/services/auth.service";
import { UserInfo } from "@/types/user.type";
import UserDropdownClient from "./UserDropdownClient";


const UserDropdown = async () => {
  const userInfo: UserInfo = await getUserInfo();

  return (
    <UserDropdownClient name={userInfo.name} />
  )
}

export default UserDropdown