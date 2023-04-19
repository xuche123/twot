import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/router"

import useUser from "@/hooks/useUser"
import { useCallback } from "react"

interface Props {
  userId: string
  isLarge?: boolean
  hasBorder?: boolean
}

export function AvatarIcon({ userId, isLarge, hasBorder }: Props) {
  const router = useRouter()
  const { data: fetchedUser } = useUser(userId)

  const onClick = useCallback((event: any) => {
    event.stopPropagation()
    const url = `/users/${userId}`

    router.push(url)

  }, [router, userId])

  const styles = {
    width: isLarge ? '128px' : '48px',
    height: isLarge ? '128px' : '48px',
    border: hasBorder ? '4px solid #000' : ''
  }


  return (
    <Avatar style={styles}>
      <AvatarImage src={fetchedUser?.profileImage || '/placeholder.png'} onClick={onClick}/>
    </Avatar>
  )
}