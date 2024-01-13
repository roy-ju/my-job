import useAPI_GetLawQna from '@/apis/lawQna/getLawQna';
import useAPI_GetLawQnaDetail from '@/apis/lawQna/getLawQnaDetail';
import { lawQnaDelete } from '@/apis/lawQna/lawQnaCrud';
import { lawQnaDislike, lawQnaLike } from '@/apis/lawQna/lawQnaLike';
import lawQnaView from '@/apis/lawQna/lawQnaView';
import { Panel } from '@/components/atoms';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { SharePopup } from '@/components/organisms';
import { LegalCounselingDetail } from '@/components/templates';
import ErrorCodes from '@/constants/error_codes';
import useAuth from '@/hooks/services/useAuth';
import { useRouter } from '@/hooks/utils';
import { useRouter as useNextRouter } from 'next/router';
import Routes from '@/router/routes';
import { getBrowser, getDevice } from '@/utils/misc';
import { memo, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Paths from '@/constants/paths';

interface Props {
  depth: number;
  panelWidth: string;
  qnaID?: number;
  ipAddress?: string;
}

export default memo(({ depth, panelWidth, qnaID, ipAddress }: Props) => {
  const { user } = useAuth();

  const [openPopup, setOpenPopup] = useState(false);
  const [openSharePopup, setOpenSharePopup] = useState(false);
  const [openErrPopup, setOpenErrPopup] = useState(false);

  const [text, setText] = useState('');

  const router = useRouter(depth);
  const nextRouter = useNextRouter();

  const { mutate: mutateQnaData } = useAPI_GetLawQna(router?.query?.q ? (router.query.q as string) : null);

  const { data: lawQnaDetailData, mutate: lawQnaDetailDataMutate } = useAPI_GetLawQnaDetail(
    router?.query?.qnaID ? Number(router?.query?.qnaID) : undefined,
  );

  const handleClickDetail = (id?: number) => {
    if (!id) return;

    router.replace(Routes.LawQnaDetail, {
      searchParams: router?.query?.q ? { qnaID: `${id}`, q: router.query.q as string } : { qnaID: `${id}` },
    });
  };

  const handleClickDelete = useCallback(async () => {
    if (!qnaID) return;

    const response = await lawQnaDelete({ law_qna_id: Number(qnaID) });

    if (response === null) {
      toast.success('게시물이 삭제되었습니다.', { toastId: 'toast_delete' });

      await mutateQnaData();

      if (router?.query?.q) {
        nextRouter.replace(`/${Routes.LawQna}?q=${router.query.q as string}`);
      } else {
        nextRouter.replace(`/${Routes.LawQna}`);
      }
    } else if (response?.error_code === ErrorCodes.NOTEXIST_LAWQNA) {
      setText('삭제');
      setOpenErrPopup(true);

      await mutateQnaData();

      if (router?.query?.q) {
        nextRouter.replace(`/${Routes.LawQna}?q=${router.query.q as string}`);
      } else {
        nextRouter.replace(`/${Routes.LawQna}`);
      }
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
        router.replaceCurrent(Routes.Login, {
          persistParams: true,
          searchParams: { redirect: `${router.asPath}`, back: 'true' },
        });
        return;
      }

      if (typeof liked !== 'boolean' || typeof qnaId !== 'number') return;

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
                if (router?.query?.q) {
                  nextRouter.replace(`/${Routes.LawQna}?q=${router.query.q as string}`);
                } else {
                  nextRouter.replace(`/${Routes.LawQna}`);
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
