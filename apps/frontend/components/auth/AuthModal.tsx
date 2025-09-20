import Link from 'next/link';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose}: AuthModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className='text-lg'>Sign in required</DialogTitle>
          <DialogDescription>
            You need to be signed in to do this action. Please sign in or create an account to continue.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-4">
          <Link href="/login">
            <Button className="w-full" onClick={onClose}>Sign In</Button>
          </Link>
          <Link href="/sign-up">
            <Button variant="outline" className="w-full" onClick={onClose}>Create Account</Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}