import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import { useToast } from "@/hooks/useToast";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";


import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (response?.error) {
        throw new Error(response.error);
      }
      toast({
        title: 'Success',
        description: 'Your have been logged in.',
      })

      loginModal.close();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Invalid email or password.',
      })
    } finally {
      setIsLoading(false);
    }
  }, [email, password, loginModal, toast]);

  const onToggle = useCallback(() => {
    loginModal.close();
    registerModal.open();
  }, [loginModal, registerModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input 
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}  
      />
      <Input 
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading} 
      />
    </div>
  )

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>First time using Twootter?
        <span 
          onClick={onToggle} 
          className="
            text-white 
            cursor-pointer 
            hover:underline
          "
          > Create an account</span>
      </p>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Sign in"
      onClose={loginModal.close}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default LoginModal;
