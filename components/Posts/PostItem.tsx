import useLoginModal from "@/hooks/useLoginModal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { formatDistanceToNowStrict } from 'date-fns';
import { AvatarIcon } from "../AvatarIcon";
import { AiOutlineMessage } from 'react-icons/ai';
import { RxHeartFilled, RxHeart } from "react-icons/rx";
import useLike from "@/hooks/useLike";

type Props = {
  userId?: string
  data: Record<string, any>
}

const PostItem = ({ userId, data }: Props) => {
  const router = useRouter();
  const loginModal = useLoginModal()
  const { hasLiked, toggleLike } = useLike({ postId: data.id, userId});

  const session = useSession()

  const goToUser = useCallback((event: any) => {
    event.stopPropagation()
    router.push(`/users/${data.user.id}`)
  }, [data.user.id, router])

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`)
  }, [router, data.id])

  const onLike = useCallback((event:any) => {
    event.stopPropagation()
    if (!session?.data?.user?.id) {
      return loginModal.open();
    }

    toggleLike();
  }, [loginModal, session?.data?.user?.id, toggleLike])

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt])

  return (
    <div 
      onClick={goToPost}
      className="
        border-b-[1px] 
        border-neutral-800 
        p-5 
        cursor-pointer 
        hover:bg-neutral-900 
        transition
      ">
      <div className="flex flex-row items-start gap-3">
        <AvatarIcon userId={data.user.id} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p 
              onClick={goToUser} 
              className="
                text-white 
                font-semibold 
                cursor-pointer 
                hover:underline
            ">
              {data.user.name}
            </p>
            <span 
              onClick={goToUser} 
              className="
                text-neutral-500
                cursor-pointer
                hover:underline
                hidden
                md:block
            ">
              @{data.user.username}
            </span>
            <span className="text-neutral-500 text-sm">
              {createdAt}
            </span>
          </div>
          <div className="text-white mt-1">
            {data.body}
          </div>
          <div className="flex flex-row items-center mt-3 gap-10">
            <div 
              className="
                flex 
                flex-row 
                items-center 
                text-neutral-500 
                gap-2 
                cursor-pointer 
                transition 
                hover:text-sky-500
            ">
              <AiOutlineMessage size={20} />
              <p>
                {data.comments?.length || 0}
              </p>
            </div>
            <div
              onClick={onLike}
              className="
                flex 
                flex-row 
                items-center 
                text-neutral-500 
                gap-2 
                cursor-pointer 
                transition 
                hover:text-red-500
            ">
              {hasLiked ? <RxHeartFilled size={20} color="red"/> : <RxHeart size={20} />}
              <p>
                {data.likedIds.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostItem