import router from "next/router"
import { useCallback } from "react"
import { IconType } from "react-icons/lib"

type Props = {
  label: string
  href?: string
  icon: IconType
  onClick?: () => void
}


const SidebarItem = ({ label, href, icon: Icon, onClick }: Props) => {
  const handleClick = useCallback(
  () => {
    if (onClick) {
      onClick()
    }
    if (href) {
      router.push(href)  
    }
  },[href, onClick],)

  return (
    <div onClick={handleClick} className="flex flex-row items-center">
      {/* mobile display: show only icons */}
      <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden">
        <Icon size={28} color="white" />
      </div>
      {/* desktop display: show icons and labels */}
      <div className="relative rounded-full gap-4 hidden items-center p-4 cursor-pointer lg:flex hover:bg-slate-300 hover:bg-opacity-10">
        <Icon size={28} color="white" />
        <p className="text-white text-xl hidden lg:flex">{label}</p>
      </div>
    </div>
  )
}

export default SidebarItem