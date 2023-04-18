import { useRouter } from "next/router"
import { RxArrowLeft } from "react-icons/rx"
import useCurrentUser from "@/hooks/useCurrentUser"

type Props = {
  label: string
  back?: boolean
}

const Header = ({ label, back }: Props) => {
  const router = useRouter()
  const { data: currentUser } = useCurrentUser();

  const handleBack = () => {
    router.push("/")
  }
  return (
    <div className="border-b-[1px] border-neutral-800 p-5">
      <div className="flex flex-row items-center gap-2">
        {back && (
          <div onClick={handleBack} className="cursor-pointer transition hover:opacity-70">
            <RxArrowLeft size={28} color="white" />
          </div>
        )}
        <h1 className="text-white text-semibold text-xl">{label} {currentUser?.name}</h1>
      </div>

    </div>
  )
}

export default Header