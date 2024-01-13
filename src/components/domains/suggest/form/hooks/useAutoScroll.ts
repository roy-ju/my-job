import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

import useCheckPlatform from '@/hooks/utils/useCheckPlatform';

import autoScroll from '../../utils/autoScroll';

import isEqualValue from '../../utils/isEqualValue';

export default function useAutoScroll<T extends string>({
  elementID,
  targetForm,
  callback,
}: {
  elementID: string;
  targetForm: T[];
  callback?: () => void;
}) {
  const platform = useCheckPlatform();

  const timeout = isEqualValue(platform?.platform, 'pc') ? 200 : 500;

  useIsomorphicLayoutEffect(() => {
    if (targetForm.length === 0) return;

    const currentForm = targetForm[targetForm.length - 1];

    setTimeout(() => {
      callback?.();
      autoScroll(elementID, targetForm, currentForm);

      // setTimeout(() => {
      // });
    }, timeout);
  }, [elementID, targetForm.length, callback]);
}
