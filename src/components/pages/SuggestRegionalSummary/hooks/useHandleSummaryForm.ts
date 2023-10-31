import { useCallback, useState } from 'react';

import { useRouter as useNextRouter } from 'next/router';

import { toast } from 'react-toastify';

import useAPI_GetDashboardInfo from '@/apis/my/getDashboardInfo';

import createSuggestRegional from '@/apis/suggest/createSuggestRegional';

import { useRouter } from '@/hooks/utils';

import { usePlatform } from '@/providers/PlatformProvider';

import Routes from '@/router/routes';

import useSummaryForm from './useSummaryForm';

export default function useHandleSummaryForm() {
  const plaform = usePlatform();

  const form = useSummaryForm();

  const nextRouter = useNextRouter();

  const { mutate } = useAPI_GetDashboardInfo();

  const router = useRouter(plaform?.depth);

  const [loading, setLoading] = useState(false);

  const handleClickBackPC = () => {
    nextRouter.replace(`${router.query.back as string}&params=${JSON.stringify(form)}&forms=${router?.query?.forms}`);
  };

  const handleClickBackMobile = () => {
    nextRouter.replace({
      pathname: `/${Routes.EntryMobile}/${Routes.SuggestRegionalForm}`,
      query: {
        ...(form ? { params: JSON.stringify(form) } : {}),
        ...(form?.address ? { address: form.address as string } : {}),
        ...(nextRouter?.query?.forms ? { forms: nextRouter.query.forms as string } : {}),
        ...(nextRouter?.query?.entry ? { entry: nextRouter.query.entry as string } : {}),
        ...(nextRouter?.query?.origin ? { origin: nextRouter.query.origin as string } : {}),
        ...(nextRouter?.query?.redirect ? { redirect: nextRouter.query.redirect as string } : {}),
      },
    });
  };

  const handleClickBack = () => {
    if (form) {
      if (plaform?.platform === 'pc') {
        handleClickBackPC();
      } else {
        handleClickBackMobile();
      }
    }
  };

  const handleSuggestForm = useCallback(async () => {
    let ignore = false;

    setLoading(true);

    delete form?.address;

    if (!ignore && form) {
      await createSuggestRegional(form);

      await mutate();

      toast.success('구해요 글이 등록되었습니다.');

      if (plaform?.platform === 'pc') {
        nextRouter.replace(`/`);
      } else {
        nextRouter.replace(`/`);

        if (nextRouter?.query?.origin) {
          nextRouter.replace(nextRouter.query.origin as string);
          return;
        }

        nextRouter.replace(`/${Routes.EntryMobile}`);
      }
    }

    return () => {
      ignore = true;
    };
  }, [form, mutate, plaform?.platform, nextRouter]);

  return { handleClickBack, handleSuggestForm, loading };
}
