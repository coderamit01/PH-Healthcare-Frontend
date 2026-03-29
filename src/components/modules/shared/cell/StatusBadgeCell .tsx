import { Badge } from "@/components/ui/badge"
import { UserStatus } from "@/types/doctor.type"

const StatusBadgeCell  = ({status}: {status: UserStatus}) => {
  return (
    <Badge variant={status === UserStatus.ACTIVE ? "default" : status === UserStatus.BLOCKED ? "destructive": "secondary"}>
      <span className="text-sm capitalize">{status.toLowerCase()}</span>
    </Badge>
  )
}

export default StatusBadgeCell 