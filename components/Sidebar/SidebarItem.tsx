import router from "next/router"
import { useCallback } from "react"
import { IconType } from "react-icons/lib"
import { useSession } from "next-auth/react"
import useLoginModal from "@/hooks/useLoginModal"
import { BsDot } from 'react-icons/bs'

type Props = {
  label: string
  href?: string
  icon: IconType
  onClick?: () => void
  auth?: boolean
  alert?: boolean
}


const SidebarItem = ({ label, href, icon: Icon, onClick, auth, alert}: Props) => {
  const loginModal = useLoginModal()
  const session = useSession()

  
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick()
    }

    if (auth && !session.data) {
      loginModal.open()
    }
    else if (href) {
      router.push(href)  
    }
  },[auth, href, loginModal, onClick, session.data],)

  return (
    <div onClick={handleClick} className="flex flex-row items-center">
      {/* mobile display: show only icons */}
      <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden">
        <Icon size={28} color="white" />
        {alert ? <BsDot className="absolute -top-4 left-4 text-sky-500" size={70} /> : null}
      </div>
      {/* desktop display: show icons and labels */}
      <div className="relative rounded-full gap-4 hidden items-center p-4 cursor-pointer lg:flex hover:bg-slate-300 hover:bg-opacity-10">
        <Icon size={28} color="white" />
        <p className="text-white text-xl hidden lg:flex">{label}</p>
        {alert ? <BsDot className="absolute -top-4 left-0 text-sky-500" size={70} /> : null}

      </div>
    </div>
  )
}

export default SidebarItem