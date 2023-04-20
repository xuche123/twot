import { useRouter } from "next/router"
import { RxPencil1 } from "react-icons/rx"
import { useCallback } from "react"
import useLoginModal from "@/hooks/useLoginModal"

type Props = {}

const SidebarTweetButton = ({}: Props) => {
  const router = useRouter()
  const loginModal = useLoginModal()
  const onClick = useCallback(
    () => {
      loginModal.open()
    },
    [loginModal],
  )
  
  return (
    <div onClick={onClick}>
      {/*mobile view: only show the icon */}
      <div className="mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-sky-500 hover:bg-opacity-80 transition cursor-pointer">
        <RxPencil1 size={28} color="white" />
      </div>
      {/*desktop view: show the icon and the text */}
      <div className="hidden lg:block mt-6 rounded-full px-4 py-2 bg-sky-500 hover:bg-opacity-80 transition cursor-pointer">
        <p className="hidden lg:block text-center text-white font-semibold text-lg">Twoot</p>
      </div>
    </div>
    
  )
}

export default SidebarTweetButton