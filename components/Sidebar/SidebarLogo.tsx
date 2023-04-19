import { useRouter } from "next/router"
import {RxSketchLogo} from "react-icons/rx"

const SidebarLogo = () => {
  const router = useRouter()
  return (
    <div
      className="rounded-full h-14 w-14 p-4 flex items-center justify-center hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer transition"
      onClick={() => router.push("/")}
      > 
      <RxSketchLogo size={28} color="white"/>
    </div>
  )
}

export default SidebarLogo