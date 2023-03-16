import { ReactNode, useEffect } from 'react';
import { useAuth } from '@/hooks/services';

export default function AuthProvider({ children }: { children?: ReactNode }) {
  const { mutateUser } = useAuth();
  useEffect(() => {
    mutateUser();
  }, [mutateUser]);

  return children as JSX.Element;
}
