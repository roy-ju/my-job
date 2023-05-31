import { ReactNode, useState, useEffect } from 'react';

export default function DeferredRender({ children }: { children: ReactNode }) {
  const [readyToRender, setReadyToRender] = useState(false);

  useEffect(() => {
    const id = requestIdleCallback(
      () => {
        setReadyToRender(true);
      },
      { timeout: 10000 },
    );
    return () => {
      cancelIdleCallback(id);
    };
  }, []);

  if (!readyToRender) return null;

  return children as JSX.Element;
}
