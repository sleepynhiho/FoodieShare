import { useAuth } from '@/context/AuthContext';

export function useProtectedAction() {
  const { isAuthenticated, showAuthModal } = useAuth();

  const protectAction = (action: () => void) => {
    if (!isAuthenticated) {
      showAuthModal();
      return;
    }
    action();
  };

  return { protectAction };
}