import { useRouter } from 'next/router';

import { useIsomorphicLayoutEffect } from '@/hooks/utils';

import { usePlatform } from '@/providers/PlatformProvider';

import useForm from './useForm';

import SuggestRegionalFormUtils from '../utils/SuggestRegionalFormUtils';

export default function useAutoScroll({ elementID }: { elementID: string }) {
  const form = useForm();

  const router = useRouter();

  const platform = usePlatform();

  useIsomorphicLayoutEffect(() => {
    if (!form?.forms) return;

    const forms = form.forms;

    const currentForm = forms[forms.length - 1];

    const timeout = platform?.platform === 'pc' ? 200 : 500;

    if (router.query.params) {
      SuggestRegionalFormUtils.autoScroll(elementID, forms, currentForm, router?.query?.params);
    } else {
      setTimeout(() => {
        SuggestRegionalFormUtils.autoScroll(elementID, forms, currentForm);
      }, timeout);
    }
  }, [elementID, router, form?.forms, platform?.platform]);
}
