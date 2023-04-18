import { RxHome, RxBell, RxPerson, RxExit } from 'react-icons/rx'
import SidebarLogo from './SidebarLogo'
import SidebarItem from './SidebarItem'
import SidebarTwootButton from './SidebarTwootButton'

const Sidebar = () => {
  const items = [
    { label: 'Home', href: '/', icon: RxHome },
    { label: 'Notification', href: '/notifications', icon: RxBell },
    { label: 'Profile', href: '/users/123', icon: RxPerson },
  ]
  return (
    <div className='col-span-1 h-full pr-4 md:pr-6'>
      <div className='flex flex-col items-end'>
        <div className='space-y-2 lg:w-[230px]'>
          <SidebarLogo />
          {
            items.map((item) => (
              <SidebarItem key={item.href} {...item} />
            ))
          }
          <SidebarItem onClick={() => { }} label='Logout' href='/logout' icon={RxExit} />
          <SidebarTwootButton />
        </div>
      </div>
    </div>
  )
}

export default Sidebar