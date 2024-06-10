import { useCallback } from 'react';

import Head from 'next/head';

import { useRouter } from 'next/router';

import { LegalCounseling } from '@/components/templates';

import useAuth from '@/hooks/services/useAuth';

import Routes from '@/router/routes';

import useAuthPopup from '@/states/hooks/useAuhPopup';

import useReturnUrl from '@/states/hooks/useReturnUrl';

import useInAppBroswerHandler from '@/hooks/useInAppBroswerHandler';

import useFetchLawQnaList from '@/services/law-qna/useFetchLawQnaList';

import Paths from '@/constants/paths';

import { apiService } from '@/services';

function LawQna() {
  const metasInfo = {
    title: `부동산 법률 상담 게시판 | ${
      process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test'
        ? '(TEST) 부동산 가격협상 앱 네고시오'
        : '부동산 가격협상 앱 네고시오'
    }`,

    description: `실제 변호사에게 답변을 받을 수 있는 부동산 상담`,

    keyWords: `부동산 법률 상담, ${
      process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오'
    }, 부동산, 아파트 실거래가, 아파트 시세, 오피스텔 실거래가, 오피스텔 시세, 실거래가, 시세, 호가, 단지, 매매, 전세, 월세, 원룸, 투룸, 교통, 환경, 주변`,

    ogTitle: '부동산 법률 상담 게시판',

    ogSiteName: process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? '네고시오(TEST)' : '네고시오',

    ogImagePath: Paths.LAWQNA,

    ogType: 'website',

    ogUrl: `${process.env.NEXT_PUBLIC_NEGOCIO_BASE_URL}/${Routes.EntryMobile}/${Routes.LawQna}`,
  };

  const { user } = useAuth();

  const router = useRouter();

  const { openAuthPopup } = useAuthPopup();

  const { handleUpdateReturnUrl } = useReturnUrl();

  const {
    data: qnaLawData,
    mutate: mutateQnaData,
    incrementalPageNumber,
  } = useFetchLawQnaList({ searchQuery: router?.query?.q ? (router.query.q as string) : null });

  const { inAppInfo, handleOpenAppInstallPopup } = useInAppBroswerHandler();

  const handleClickBack = () => {
    router.replace(`/${Routes.EntryMobile}`);
  };

  const handleClickAllPage = () => {
    router.replace(`/${Routes.EntryMobile}/${Routes.LawQna}`);
  };

  const handleClickHome = () => {
    router.push(`/${Routes.EntryMobile}`);
  };

  const handleClickSearchPage = () => {
    if (router?.query?.q) {
      router.push(`/${Routes.EntryMobile}/${Routes.LawQnaSearch}?q=${router.query.q as string}`);
    } else {
      router.push(`/${Routes.EntryMobile}/${Routes.LawQnaSearch}`);
    }
  };

  const handleClickCreateButton = () => {
    if (inAppInfo.isInAppBrowser) {
      handleOpenAppInstallPopup();
      return;
    }

    if (!user) {
      const returnUrl = router.query.q
        ? `/${Routes.EntryMobile}/${Routes.LawQnaCreate}?q=${router.query.q}`
        : `/${Routes.EntryMobile}/${Routes.LawQnaCreate}`;

      handleUpdateReturnUrl(returnUrl);
      openAuthPopup('onlyLogin');
      return;
    }

    router.push({
      pathname: `/${Routes.EntryMobile}/${Routes.LawQnaCreate}`,
      query: { ...(router.query.q ? { q: `${router.query.q}` } : {}) },
    });
  };

  const handleQnaDetail = (id?: number) => {
    if (typeof id !== 'number') return;

    if (router?.query?.q) {
      router.push(`/${Routes.EntryMobile}/${Routes.LawQnaDetail}?qnaID=${id}&q=${router?.query?.q as string}`);
    } else {
      router.push(`/${Routes.EntryMobile}/${Routes.LawQnaDetail}?qnaID=${id}`);
    }
  };

  const handleClickLike = useCallback(
    async (liked?: boolean, qnaId?: number) => {
      if (inAppInfo.isInAppBrowser) {
        handleOpenAppInstallPopup();
        return;
      }

      if (!user) {
        handleUpdateReturnUrl();
        openAuthPopup('onlyLogin');
        return;
      }

      if (typeof liked !== 'boolean' || typeof qnaId !== 'number') {
        return;
      }

      if (liked) {
        await apiService.lawQnaDislike({ law_qna_id: qnaId });
        mutateQnaData();
      } else {
        await apiService.lawQnaLike({ law_qna_id: qnaId });
        mutateQnaData();
      }
    },
    [handleOpenAppInstallPopup, handleUpdateReturnUrl, inAppInfo.isInAppBrowser, mutateQnaData, openAuthPopup, user],
  );

  return (
    <>
      <Head>
        <title>{metasInfo.title}</title>
        <meta name="description" content={metasInfo.description} />
        <meta property="keywords" content={metasInfo.keyWords} />
        <meta property="og:title" content={metasInfo.ogTitle} />
        <meta property="og:description" content={metasInfo.description} />
        <meta property="og:site_name" content={metasInfo.ogSiteName} />
        <meta property="og:type" content={metasInfo.ogType} />
        <meta property="og:image" content={metasInfo.ogImagePath} />
        {process.env.NEXT_PUBLIC_APP_ENVIRONMENT !== 'test' && <meta property="og:url" content={metasInfo.ogUrl} />}
      </Head>
      <LegalCounseling
        qnaLawData={qnaLawData}
        onNext={incrementalPageNumber}
        onClickBack={handleClickBack}
        onClickHome={handleClickHome}
        onClickLike={handleClickLike}
        onClickSearchPage={handleClickSearchPage}
        onClickQnaDetail={handleQnaDetail}
        onClickCreate={handleClickCreateButton}
        onClickAllPage={handleClickAllPage}
      />
    </>
  );
}

export default LawQna;
