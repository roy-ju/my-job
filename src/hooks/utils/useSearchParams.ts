import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';

export default function useSearchParams<T>(
  key: string,
): [T | null, (_: T | null | ((_: T | null) => T | null)) => void] {
  const router = useRouter();

  const encodedValue = useMemo<string | null>(() => (router.query[key] as string) ?? null, [router.query, key]);

  const decodedValue = useMemo<T | null>(
    () => (encodedValue !== null ? JSON.parse(decodeURIComponent(encodedValue)) : null),
    [encodedValue],
  );

  const update = useCallback(
    (value: T | null | ((_: T | null) => T | null)) => {
      const query = { ...router.query };
      const previousEncodedValue = query[key] as string;
      const valueToStore =
        value instanceof Function
          ? value(previousEncodedValue ? JSON.parse(decodeURIComponent(previousEncodedValue)) : null)
          : value;
      const newEncodedValue = encodeURIComponent(JSON.stringify(valueToStore));

      if (value === null) {
        delete query[key];
      } else {
        query[key] = newEncodedValue;
      }

      if (newEncodedValue !== previousEncodedValue) {
        router.replace(
          {
            query,
          },
          undefined,
          { shallow: true },
        );
      }
    },
    [key, router],
  );

  return [decodedValue, update];
}
