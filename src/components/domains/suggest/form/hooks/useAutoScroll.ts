import useIsomorphicLayoutEffect from '@/hooks/utils/useIsomorphicLayoutEffect';

import useCheckPlatform from '@/hooks/utils/useCheckPlatform';

import autoScroll from '../../utils/autoScroll';

import isEqualValue from '../../utils/isEqualValue';

export default function useAutoScroll<T extends string>({
  elementID,
  targetForm,
  stop = false,
}: {
  elementID: string;
  targetForm: T[];
  stop?: boolean;
}) {
  const platform = useCheckPlatform();

  const timeout = isEqualValue(platform?.platform, 'pc') ? 200 : 500;

  useIsomorphicLayoutEffect(() => {
    if (stop) return;

    if (targetForm.length === 0) return;

    const currentForm = targetForm[targetForm.length - 1];

    setTimeout(() => {
      autoScroll(elementID, targetForm, currentForm);
    }, timeout);
  }, [elementID, targetForm.length]);
}
