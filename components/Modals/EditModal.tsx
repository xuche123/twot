import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useToast } from "@/hooks/useToast";
import { Textarea } from "../ui/textarea";

import { useSession } from "next-auth/react";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";

import Input from "../ui/Input";
import Modal from "../ui/Modal";

import ImageUpload from "../ImageUpload";

/*
TODO : Right now request is limited to 1mb, need to increase it.
       Implement functionality to allow user to crop/resize/reposition image.
*/
const EditModal = () => {
  const session = useSession();
  const { mutate: mutateFetchedUser } = useUser(session.data?.user?.id as string);
  const editModal = useEditModal();
  const { toast } = useToast();

  const [profileImage, setProfileImage] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    if (!session.data?.user) {
      return;
    }
    if (session.data?.user?.profileImage) {
      setProfileImage(session.data?.user?.profileImage)
    }
    if (session.data?.user?.coverImage) {
      setCoverImage(session.data?.user?.coverImage)
    }
    if (session.data?.user?.name) {
      setName(session.data?.user?.name)
    }
    if (session.data?.user?.username) {
      setUsername(session.data?.user?.username)
    }
    if (session.data?.user?.bio) {
      setBio(session.data?.user?.bio)
    }
  }, [session.data?.user?.profileImage, session.data?.user?.coverImage, session.data?.user?.name, session.data?.user?.username, session.data?.user?.bio, session.data?.user]);
  
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.patch('/api/edit', { name, username, bio, profileImage, coverImage });
      mutateFetchedUser();
      toast({
        title: 'Success',
        description: 'Your profile has been editted.',
      })

      editModal.close();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong.',
      })
    } finally {
      setIsLoading(false);
    }
  }, [name, username, bio, profileImage, coverImage, mutateFetchedUser, toast, editModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload value={profileImage} disabled={isLoading} onChange={(image) => setProfileImage(image)} label="Upload profile image (Limited to < 1mb in size)" />
      <ImageUpload value={coverImage} disabled={isLoading} onChange={(image) => setCoverImage(image)} label="Upload cover image (Limited to < 1mb in size)" />
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}  
      />
      <Input 
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading} 
      />
      <Textarea disabled={isLoading} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio" />
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title="Edit your profile"
      actionLabel="Save"
      onClose={editModal.close}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
}

export default EditModal;
