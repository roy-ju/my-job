/* eslint-disable @typescript-eslint/no-unused-vars */

import { useCallback } from 'react';

import { useRouter } from 'next/router';

import { useRouter as useCustomRouter } from '@/hooks/utils';

import useCheckPlatform from '@/hooks/utils/useCheckPlatform';

export default function useUpdateFormSummitButton({ depth }: { depth?: number }) {
  const customRouter = useCustomRouter(depth);

  const router = useRouter();

  const { platform } = useCheckPlatform();

  const handleClickSubmit = useCallback(() => {}, []);

  return { handleClickSubmit };
}
