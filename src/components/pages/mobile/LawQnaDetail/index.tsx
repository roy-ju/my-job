import useAPI_GetLawQna from '@/apis/lawQna/getLawQna';
import useAPI_GetLawQnaDetail from '@/apis/lawQna/getLawQnaDetail';
import { lawQnaDelete } from '@/apis/lawQna/lawQnaCrud';
import { lawQnaDislike, lawQnaLike } from '@/apis/lawQna/lawQnaLike';
import lawQnaView from '@/apis/lawQna/lawQnaView';
import { MobileContainer } from '@/components/atoms';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { SharePopup } from '@/components/organisms';
import { LegalCounselingDetail } from '@/components/templates';
import ErrorCodes from '@/constants/error_codes';
import Paths from '@/constants/paths';
import useAuth from '@/hooks/services/useAuth';

import Routes from '@/router/routes';
import { getDevice, getBrowser } from '@/utils/misc';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function LawQnaDetail() {
  const { user } = useAuth();

  const router = useRouter();
  const qnaID = router?.query?.qnaID;

  const [openPopup, setOpenPopup] = useState(false);
  const [openSharePopup, setOpenSharePopup] = useState(false);
  const [openErrPopup, setOpenErrPopup] = useState(false);
  const [text, setText] = useState('');

  const { mutate: mutateQnaData } = useAPI_GetLawQna(router?.query?.q ? (router.query.q as string) : null);

  const { data: lawQnaDetailData, mutate: lawQnaDetailDataMutate } = useAPI_GetLawQnaDetail(
    router?.query?.qnaID ? Number(router?.query?.qnaID) : undefined,
  );

  const handleClickDetail = (id?: number) => {
    if (!id) return;

    if (router?.query?.q) {
      router.push(`/${Routes.EntryMobile}/${Routes.LawQnaDetail}?qnaID=${id}&q=${router.query.q as string}`);
    } else {
      router.push(`/${Routes.EntryMobile}/${Routes.LawQnaDetail}?qnaID=${id}`);
    }
  };

  const handleClickBack = () => {
    if (typeof window !== 'undefined' && window?.history?.length > 1) {
      router.back();
    } else {
      router.replace(`/${Routes.LawQna}`);
    }
  };

  const handleClickDelete = useCallback(async () => {
    if (!qnaID) return;

    const response = await lawQnaDelete({ law_qna_id: Number(qnaID) });

    if (response === null) {
      toast.success('게시물이 삭제되었습니다.', { toastId: 'toast_delete' });
      mutateQnaData();

      if (typeof window !== 'undefined' && window?.history?.length > 1) {
        router.back();
      } else {
        router.replace(`/${Routes.LawQna}`);
      }
    } else if (response?.error_code === ErrorCodes.NOTEXIST_LAWQNA) {
      setText('삭제');
      setOpenErrPopup(true);

      setTimeout(() => {
        if (typeof window !== 'undefined' && window?.history?.length > 1) {
          router.back();
        } else {
          router.replace(`/${Routes.LawQna}`);
        }
      }, 3000);
    }
  }, [mutateQnaData, qnaID, router]);

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
    }

    if (router?.query?.q) {
      router.push(
        {
          pathname: `/${Routes.EntryMobile}/${Routes.LawQnaUpdate}`,
          query: {
            qnaID: `${qnaID}`,
            title: lawQnaDetailData?.title || '',
            content: lawQnaDetailData?.user_message || '',
            q: router.query.q as string,
          },
        },
        `/${Routes.EntryMobile}/${Routes.LawQnaUpdate}?qnaID=${qnaID}&q=${router.query.q}`,
      );
    } else {
      router.push(
        {
          pathname: `/${Routes.EntryMobile}/${Routes.LawQnaUpdate}`,
          query: {
            qnaID: `${qnaID}`,
            title: lawQnaDetailData?.title || '',
            content: lawQnaDetailData?.user_message || '',
          },
        },
        `/${Routes.EntryMobile}/${Routes.LawQnaUpdate}?qnaID=${qnaID}`,
      );
    }
  };

  const handleClickErrPopupClose = () => {
    setText('');
    setOpenErrPopup(false);
  };

  const handleClickLike = useCallback(
    async (liked?: boolean, qnaId?: number) => {
      if (!user) {
        router.push({
          pathname: `/${Routes.EntryMobile}/${Routes.Login}`,
          query: {
            redirect: router.asPath,
          },
        });
        return;
      }

      if (typeof liked !== 'boolean' || typeof qnaId !== 'number') {
        return;
      }

      if (liked) {
        await lawQnaDislike({ law_qna_id: qnaId });
        lawQnaDetailDataMutate();
        mutateQnaData();
      } else {
        await lawQnaLike({ law_qna_id: qnaId });
        lawQnaDetailDataMutate();
        mutateQnaData();
      }
    },
    [lawQnaDetailDataMutate, mutateQnaData, router, user],
  );

  const handleCopyUrl = useCallback(() => {
    const content = `[네고시오] 부동산 법률 상담 게시판\n\n부동산 거래 플랫폼 네고시오에서 변호사가 직접\n법률 상담에 답변해 드려요.\n\n${window.origin}/${Routes.LawQnaDetail}?qnaID=${qnaID}`;
    navigator.clipboard.writeText(content);
    setOpenSharePopup(false);
    toast.success('복사되었습니다.');
  }, [qnaID]);

  const handleShareViaKakao = useCallback(() => {
    const link = `${window.origin}/${Routes.LawQnaDetail}?qnaID=${qnaID}`;

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      installTalk: true,
      content: {
        title: '네고시오 부동산 법률 상담게시판',
        description: `Q.${lawQnaDetailData?.title}`,
        imageUrl: Paths.LAWQNA,
        link: {
          mobileWebUrl: link,
          webUrl: link,
        },
        imageWidth: 1200,
        imageHeight: 630,
      },
      buttons: [
        {
          title: '자세히보기',
          link: {
            mobileWebUrl: link,
            webUrl: link,
          },
        },
      ],
    });

    setOpenSharePopup(false);
  }, [lawQnaDetailData?.title, qnaID]);

  useEffect(() => {
    async function view(id: number) {
      await lawQnaView({
        ip_address: '',
        device: getDevice(),
        browser: getBrowser(),
        law_qna_id: id,
      });

      mutateQnaData();
    }

    if (lawQnaDetailData && typeof window !== 'undefined') {
      view(lawQnaDetailData.id);
    }
  }, [lawQnaDetailData, mutateQnaData]);

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

                if (typeof window !== 'undefined' && window?.history?.length > 1) {
                  router.back();
                } else {
                  router.replace(`/${Routes.LawQna}`);
                }
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
    <MobileContainer>
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
        onClickBack={handleClickBack}
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
    </MobileContainer>
  );
}

export default LawQnaDetail;
