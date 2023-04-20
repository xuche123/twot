import axios from "axios";
import { useCallback, useMemo } from "react";
import { useToast } from "./useToast";
import { useSession } from "next-auth/react";

import useLoginModal from "./useLoginModal";
import usePost from "./usePost";
import usePosts from "./usePosts";

const useLike = ({ postId, userId }: { postId: string, userId?: string }) => {
  const session = useSession();
  const { toast } = useToast();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts(userId);

  const loginModal = useLoginModal();

  const hasLiked = useMemo(() => {
    const list = fetchedPost?.likedIds || [];

    return list.includes(session?.data?.user?.id);
  }, [fetchedPost?.likedIds, session?.data?.user?.id]);

  const toggleLike = useCallback(async () => {
    if (!session?.data?.user?.id) {
      return loginModal.open();
    }

    try {
      let request;

      if (hasLiked) {
        request = () => axios.put('/api/like', { postId });
      } else {
        request = () => axios.post('/api/like', { postId });
      }

      await request();
      mutateFetchedPost();
      mutateFetchedPosts();

      toast({
        title: hasLiked ? 'Unliked' : 'Liked',
        description: 'success',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: "Couldn't like/unlike",
      });
    }
  }, [session?.data?.user?.id, loginModal, hasLiked, mutateFetchedPost, mutateFetchedPosts, toast, postId]);

  return {
    hasLiked,
    toggleLike,
  }
}

export default useLike;
