import useSharedComponents from '@/states/shared_components';
import { ReactNode, useEffect } from 'react';

type Props = {
  componentKey: string;
  depth: number;
  children?: ReactNode;
};

export default function Shared({ componentKey, depth, children }: Props) {
  const { registerKey, unregisterKey, doesKeyExistInPreviousDepth } =
    useSharedComponents();

  useEffect(() => {
    registerKey(componentKey, depth);
    return () => {
      unregisterKey(componentKey, depth);
    };
  }, [componentKey, depth, registerKey, unregisterKey]);

  if (doesKeyExistInPreviousDepth(componentKey, depth)) {
    return null;
  }

  return <>{children}</>;
}
