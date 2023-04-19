import useLoginModal from "@/hooks/useLoginModal"
import useRegisterModal from "@/hooks/useRegisterModal"
import usePosts from "@/hooks/usePosts"
import axios from "axios"

import { useSession } from "next-auth/react"
import { useCallback, useState } from "react"
import { useToast } from "@/hooks/useToast"
import { Button } from "./ui/button"
import { AvatarIcon } from "./AvatarIcon"

type Props = {
  placeholder: string
  isComment?: boolean
  postId?: string
}

const Form = ({ placeholder, isComment, postId }: Props) => {
  const session = useSession()
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const { toast } = useToast()

  const { mutate: mutatePosts } = usePosts()
  
  const [body, setBody] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)

      await axios.post('/api/posts', { body })

      toast({
        title: 'Success',
        description: 'Post created successfully.',
      })

      setBody('')
      mutatePosts()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: "Something went wrong. Please try again later.",
      })
    } finally {
      setIsLoading(false)
    }
  }, [body, mutatePosts, toast])

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {session.data ? (
        <div className="flex flex-row gap-4">
          <div>
            <AvatarIcon userId={session.data?.user?.id} />
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(event) => setBody(event.target.value)}
              value={body}
              className="
                disabled:opacity-80
                peer
                resize-none 
                mt-3 
                w-full 
                bg-black 
                ring-0 
                outline-none 
                text-[20px] 
                placeholder-neutral-500 
                text-white
              "
              placeholder={placeholder}>
            </textarea>
            <hr 
              className="
                opacity-0 
                peer-focus:opacity-100 
                h-[1px] 
                w-full 
                border-neutral-800 
                transition"
            />
            <div className="mt-4 flex flex-row justify-end">
              <Button disabled={isLoading || !body} onClick={onSubmit}>
                Twoot
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="text-white text-2xl text-center mb-4 font-bold">Welcome to Twitter</h1>
          <div className="flex flex-row items-center justify-center gap-4">
              <Button onClick={loginModal.open}>
                Login
              </Button>
              <Button onClick={registerModal.open} variant="secondary">
                Register
              </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Form