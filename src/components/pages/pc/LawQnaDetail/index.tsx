import { memo, useCallback, useEffect, useState } from 'react';

import { useRouter as useNextRouter } from 'next/router';

import { useRouter } from '@/hooks/utils';

import { toast } from 'react-toastify';

import { Panel } from '@/components/atoms';

import { OverlayPresenter, Popup } from '@/components/molecules';

import { SharePopup } from '@/components/organisms';

import { LegalCounselingDetail } from '@/components/templates';

import useAuthPopup from '@/states/hooks/useAuhPopup';

import useReturnUrl from '@/states/hooks/useReturnUrl';

import useAuth from '@/hooks/services/useAuth';

import kakaoShare from '@/utils/kakaoShare';

import { getBrowser, getDevice } from '@/utils/misc';

import ErrorCodes from '@/constants/error_codes';

import Paths from '@/constants/paths';

import Routes from '@/router/routes';

import useFetchLawQnaList from '@/services/law-qna/useFetchLawQnaList';

import useFetchLawQnaDetail from '@/services/law-qna/useFetchLawQnaDetail';

import { apiService } from '@/services';

interface Props {
  depth: number;
  panelWidth: string;
  qnaID?: number;
  ipAddress?: string;
}

export default memo(({ depth, panelWidth, qnaID, ipAddress }: Props) => {
  const { user } = useAuth();

  const router = useRouter(depth);

  const nextRouter = useNextRouter();

  const [openPopup, setOpenPopup] = useState(false);

  const [openSharePopup, setOpenSharePopup] = useState(false);

  const [openErrPopup, setOpenErrPopup] = useState(false);

  const [text, setText] = useState('');

  const { mutate: mutateQnaData } = useFetchLawQnaList({
    searchQuery: router?.query?.q ? (router.query.q as string) : null,
  });

  const { openAuthPopup } = useAuthPopup();

  const { handleUpdateReturnUrl } = useReturnUrl();

  const { data: lawQnaDetailData, mutate: lawQnaDetailDataMutate } = useFetchLawQnaDetail(
    router?.query?.qnaID ? Number(router?.query?.qnaID) : undefined,
  );

  const handleClickDetail = (id?: number) => {
    if (!id) return;

    router.replace(Routes.LawQnaDetail, {
      searchParams: { qnaID: `${id}`, ...(router?.query?.q ? { q: router.query.q as string } : {}) },
    });
  };

  const handleClickDelete = useCallback(async () => {
    if (!qnaID) return;

    const response = await apiService.deleteLawQna({ law_qna_id: Number(qnaID) });

    if (response === null) {
      toast.success('게시물이 삭제되었습니다.', { toastId: 'toast_delete' });

      await mutateQnaData();

      nextRouter.replace({
        pathname: `/${Routes.LawQna}`,
        query: { ...(router?.query?.q ? { q: router.query.q } : {}) },
      });
    } else if (response?.error_code === ErrorCodes.NOTEXIST_LAWQNA) {
      setText('삭제');
      setOpenErrPopup(true);

      await mutateQnaData();

      nextRouter.replace({
        pathname: `/${Routes.LawQna}`,
        query: { ...(router?.query?.q ? { q: router.query.q } : {}) },
      });
    }
  }, [mutateQnaData, qnaID, nextRouter, router]);

  const handleClickPopupOpen = () => {
    if (lawQnaDetailData?.admin_message) {
      setText('삭제');
      setOpenErrPopup(true);
      return;
    }
    setOpenPopup(true);
  };

  const handleClickPopupClose = () => {
    setOpenPopup(false);
  };

  const handleClickUpdate = () => {
    if (lawQnaDetailData?.admin_message) {
      setText('수정');
      setOpenErrPopup(true);
      return;
    }

    router.replace(Routes.LawQnaUpdate, {
      searchParams: router?.query?.q ? { qnaID: `${qnaID}`, q: router.query.q as string } : { qnaID: `${qnaID}` },
      state: {
        title: lawQnaDetailData?.title || '',
        content: lawQnaDetailData?.user_message || '',
      },
    });
  };

  const handleClickErrPopupClose = () => {
    setText('');
    setOpenErrPopup(false);
  };

  const handleClickLike = useCallback(
    async (liked?: boolean, qnaId?: number) => {
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
        lawQnaDetailDataMutate();
        mutateQnaData();
      } else {
        await apiService.lawQnaLike({ law_qna_id: qnaId });
        lawQnaDetailDataMutate();
        mutateQnaData();
      }
    },
    [handleUpdateReturnUrl, lawQnaDetailDataMutate, mutateQnaData, openAuthPopup, user],
  );

  const handleCopyUrl = useCallback(() => {
    const content = `[네고시오] 부동산 법률 상담 게시판\n\n부동산 거래 플랫폼 네고시오에서 변호사가 직접\n법률 상담에 답변해 드려요.\n\n${window.origin}/${Routes.LawQnaDetail}?qnaID=${qnaID}`;
    navigator.clipboard.writeText(content);

    setOpenSharePopup(false);

    toast.success('복사되었습니다.');
  }, [qnaID]);

  const handleShareViaKakao = useCallback(() => {
    const link = `${window.origin}/${Routes.LawQnaDetail}?qnaID=${qnaID}`;

    kakaoShare({
      width: 1200,
      height: 630,
      objectType: 'feed',
      title: '네고시오 부동산 법률 상담게시판',
      description: `Q.${lawQnaDetailData?.title}`,
      imgUrl: Paths.LAWQNA,
      buttonTitle: '자세히보기',
      link,
    });

    setOpenSharePopup(false);
  }, [lawQnaDetailData?.title, qnaID]);

  useEffect(() => {
    async function view(id: number) {
      await apiService.viewLawQna({
        ip_address: ipAddress !== '::1' ? ipAddress ?? '' : '',
        law_qna_id: id,
        device: getDevice(),
        browser: getBrowser(),
      });

      mutateQnaData();
    }

    if (lawQnaDetailData && typeof window !== 'undefined') {
      view(lawQnaDetailData.id);
    }
  }, [ipAddress, lawQnaDetailData, mutateQnaData]);

  if (!qnaID) return null;

  if (lawQnaDetailData?.error_code === ErrorCodes.NOTEXIST_LAWQNA) {
    return (
      <OverlayPresenter>
        <Popup>
          <Popup.ContentGroup tw="py-6">
            <Popup.SmallTitle tw="text-b2 text-center">
              이미 삭제된 게시물 입니다.
              <br />
              다른 게시물을 선택해 주세요.
            </Popup.SmallTitle>
          </Popup.ContentGroup>
          <Popup.ButtonGroup>
            <Popup.ActionButton
              onClick={() => {
                mutateQnaData();
                nextRouter.replace({
                  pathname: `/${Routes.LawQna}`,
                  query: { ...(router?.query?.q ? { q: router.query.q } : {}) },
                });
              }}
            >
              확인
            </Popup.ActionButton>
          </Popup.ButtonGroup>
        </Popup>
      </OverlayPresenter>
    );
  }

  return (
    <>
      <Panel width={panelWidth}>
        <LegalCounselingDetail
          openPopup={openPopup}
          openErrPopup={openErrPopup}
          lawQnaDetailData={lawQnaDetailData}
          errorTitle={text}
          onClickDetail={handleClickDetail}
          onClickLike={handleClickLike}
          onClickDelete={handleClickDelete}
          onClickPopupOpen={handleClickPopupOpen}
          onClickPopupClose={handleClickPopupClose}
          onClickErrPopupClose={handleClickErrPopupClose}
          onClickUpdate={handleClickUpdate}
          onClickSharePopup={() => setOpenSharePopup(true)}
        />

        {openSharePopup && (
          <OverlayPresenter>
            <SharePopup
              onClickOutside={() => setOpenSharePopup(false)}
              onClickShareViaKakao={handleShareViaKakao}
              onClickCopyUrl={handleCopyUrl}
            />
          </OverlayPresenter>
        )}
      </Panel>
    </>
  );
});
