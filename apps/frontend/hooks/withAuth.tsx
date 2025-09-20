import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export function withAuth<T extends object>(WrappedComponent: React.ComponentType<T>) {
  return function WithAuthComponent(props: T) {
    const { isAuthenticated, showAuthModal } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        showAuthModal('access this page');
        router.push('/');
      }
    }, [isAuthenticated, router, showAuthModal]);

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}