// import axios from "axios";
// import { useCallback, useMemo} from "react";

// import { useSession } from "next-auth/react";
// import useLoginModal from "./useLoginModal";
// import useUser from "./useUser";
// import { useToast } from "./useToast";

// const useFollow = (userId: string) => {
//   const session = useSession();
//   const { mutate: mutateFetchedUser } = useUser(userId);

//   const loginModal = useLoginModal();
//   const { toast } = useToast();

//   const isFollowing = useMemo(() => {
//     const list = session?.data?.user?.followingIds || [];

//     return list.includes(userId);
//   }, [session?.data?.user?.followingIds, userId]);

//   const toggleFollow = useCallback(async () => {
//     if (!session?.data?.user) {
//       return loginModal.open();
//     }

//     try {
//       let request;

//       if (isFollowing) {
//         request = () => axios.delete('/api/follow', { data: { userId } });
//       } else {
//         request = () => axios.post('/api/follow', { userId });
//       }

//       await request();
//       mutateFetchedUser();

//       toast({
//         title: isFollowing ? 'Unfollowed' : 'Followed',
//         description: 'success',
//       });
//     } catch (error) {
//       toast({
//         variant: 'destructive',
//         title: 'Error',
//         description: "Couldn't follow/unfollow",
//       })
//     }
//   }, [session?.data?.user, loginModal, isFollowing, mutateFetchedUser, toast, userId]);

//   return {
//     isFollowing,
//     toggleFollow,
//   }
// }

// export default useFollow;

import axios, { AxiosRequestConfig } from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import useUser from "./useUser";

const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(userId);

  const loginModal = useLoginModal();

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];

    return list.includes(userId);
  }, [currentUser, userId]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      return loginModal.open();
    }

    try {
      let request;

      if (isFollowing) {
        request = () => axios.put('/api/follow', {userId});
      } else {
        request = () => axios.post('/api/follow', { userId });
      }

      await request();
      mutateCurrentUser();
      mutateFetchedUser();

      toast.success('Success');
    } catch (error) {
      toast.error('Something went wrong');
    }
  }, [currentUser, isFollowing, userId, mutateCurrentUser, mutateFetchedUser, loginModal]);

  return {
    isFollowing,
    toggleFollow,
  }
}

export default useFollow;

