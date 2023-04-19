import useUser from "@/hooks/useUser"
import { AvatarIcon } from "@/components/AvatarIcon"
import Image from "next/image"

type Props = {
  userId: string
}

const UserHero = ({ userId }: Props) => {
  const { data: fetchedUser } = useUser(userId)
  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {fetchedUser?.coverImage && (
          <Image src={fetchedUser.coverImage} fill alt="Cover Image" style={{objectFit: 'cover'}} />
        )}
        <div className="absolute -bottom-16 left-4">
          <AvatarIcon userId={userId} isLarge hasBorder />
        </div>
      </div>
    </div>
  )
}

export default UserHero