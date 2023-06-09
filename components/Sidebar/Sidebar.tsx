import { RxHome, RxBell, RxPerson, RxExit } from 'react-icons/rx'
import { signOut } from 'next-auth/react';

import SidebarItem from './SidebarItem';
import SidebarLogo from './SidebarLogo';
import SidebarTweetButton from './SidebarTweetButton';
import { useSession } from 'next-auth/react';
import useCurrentUser from '@/hooks/useCurrentUser';

const Sidebar = () => {
  const session = useSession();
  const { data: currentUser } = useCurrentUser(true);

  const items = [
    {
      icon: RxHome,
      label: 'Home',
      href: '/',
    },
    {
      icon: RxBell,
      label: 'Notifications',
      href: '/notifications',
      auth: true,
      alert: currentUser?.hasNotification,
    },
    {
      icon: RxPerson,
      label: 'Profile',
      href: `/users/${session.data?.user?.id}`,
      auth: true,
    },
  ]

  return (
    <div className="col-span-1 h-full pr-4 md:pr-6 relative">
        <div className="flex flex-col items-end fixed">
          <div className="space-y-2 lg:w-[230px]">
            <SidebarLogo />
            {items.map((item) => (
              <SidebarItem
                key={item.href}
                href={item.href} 
                icon={item.icon} 
                label={item.label}
                auth={item.auth}
                alert={item.alert}
              />
            ))}
            {session.data && <SidebarItem onClick={() => signOut()} icon={RxExit} label="Logout" />}
            <SidebarTweetButton />
          </div>
        </div>
      </div>
  )
};

export default Sidebar;
