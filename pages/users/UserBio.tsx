import { useSession } from 'next-auth/react';
import { format } from 'date-fns';
import { useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { RxCalendar } from 'react-icons/rx';

import useEditModal from '@/hooks/useEditModal';
import useUser from '@/hooks/useUser';

type Props = {
  userId: string
}

const UserBio = ({ userId }: Props) => {
  const session = useSession()
  const { data: fetchedUser } = useUser(userId)

  const editModal = useEditModal()

  const createdAt = useMemo(() => {
    if (!fetchedUser?.createdAt) {
      return null;
    }

    return format(new Date(fetchedUser.createdAt), 'MMMM yyyy');
  }, [fetchedUser?.createdAt])

  return (
    <div className='border-b-[1px] border-neutral-800 pb-4'>
      <div className='flex justify-end p-2'>
        {session.data?.user?.id === userId ? (
          <Button variant='secondary' onClick={editModal.open}>
            Edit
            </Button>
        ) : (
            <Button variant='secondary' onClick={() => { }}>
              Follow
            </Button>
        )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-white text-2xl font-semibold">
            {fetchedUser?.name}
          </p>
          <p className="text-md text-neutral-500">
            @{fetchedUser?.username}
          </p>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-neutral-500">
            {fetchedUser?.bio}
          </p>
          <div 
            className="flex flex-row items-center gap-2 mt-4text-neutral-500">
            <RxCalendar size={24} color='white'/>
            <p className='text-neutral-500'>
              Joined {createdAt}
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center mt-4 gap-6">
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{fetchedUser?.followingIds?.length}</p>
            <p className="text-neutral-500">Following</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{fetchedUser?.followersCount || 0}</p>
            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserBio