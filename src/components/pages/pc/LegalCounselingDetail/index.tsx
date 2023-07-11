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
import { useAuth } from '@/hooks/services';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { getBrowser, getDevice } from '@/utils/misc';
import { memo, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

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

  const { mutate: mutateQnaData } = useAPI_GetLawQna(router?.query?.search ? (router.query.search as string) : null);

  const { data: lawQnaDetailData, mutate: lawQnaDetailDataMutate } = useAPI_GetLawQnaDetail(
    router?.query?.qnaID ? Number(router?.query?.qnaID) : undefined,
  );

  const handleClickDetail = (id?: number) => {
    if (!id) return;

    router.replace(Routes.LawQnaDetail, { searchParams: { qnaID: `${id}` } });
  };

  const handleClickDelete = useCallback(async () => {
    if (!qnaID) return;

    const response = await lawQnaDelete({ law_qna_id: Number(qnaID) });

    if (response === null) {
      toast.success('게시물이 삭제되었습니다.', { toastId: 'toast_delete' });
      mutateQnaData();
      router.popLast(true);
    } else if (response?.error_code === ErrorCodes.NOTEXIST_LAWQNA) {
      setText('삭제');
      setOpenErrPopup(true);
      router.popLast(true);
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
      return;
    }

    router.replace(Routes.LawQnaUpdate, {
      searchParams: { qnaID: `${qnaID}` },
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
    // let priceText = '';
    // if (data?.listing?.buy_or_rent === BuyOrRent.Wolsae) {
    //   priceText = `${formatNumberInKorean(data?.trade_or_deposit_price)}/${formatNumberInKorean(
    //     data?.monthly_rent_fee,
    //   )}`;
    // } else {
    //   priceText = `${formatNumberInKorean(data?.trade_or_deposit_price ?? 0)}`;
    // }
    // const content = `[네고시오] ${data?.display_address}\n► 부동산 종류 : ${
    //   RealestateTypeString[data?.listing?.realestate_type ?? 0]
    // }\n► 거래종류 : ${BuyOrRentString[data?.listing?.buy_or_rent ?? 0]}\n► 집주인 희망가 :${priceText}\n\n${
    //   window.origin
    // }/${Routes.ListingDetail}?listingID=${data?.listing?.id}`;
    // navigator.clipboard.writeText(content);
    // setOpenSharePopup(false);
    // toast.success('복사되었습니다.');
  }, []);

  const handleShareViaKakao = useCallback(() => {
    // const link = `${window.origin}/${Routes.ListingDetail}?listingID=${data?.listing?.id}`;
    // let description = data?.display_address;
    // if (data?.listing?.buy_or_rent === BuyOrRent.Wolsae) {
    //   description = `${formatNumberInKorean(data?.trade_or_deposit_price)}/${formatNumberInKorean(
    //     data?.monthly_rent_fee,
    //   )}, ${data?.display_address}`;
    // } else {
    //   description = `${formatNumberInKorean(data?.trade_or_deposit_price ?? 0)}, ${data?.display_address}`;
    // }
    // window.Kakao.Share.sendDefault({
    //   objectType: 'feed',
    //   installTalk: true,
    //   content: {
    //     title: data?.listing?.listing_title ?? '',
    //     description,
    //     imageUrl: Paths.DEFAULT_OPEN_GRAPH_IMAGE_2,
    //     link: {
    //       mobileWebUrl: link,
    //       webUrl: link,
    //     },
    //     imageWidth: 1200,
    //     imageHeight: 630,
    //   },
    //   buttons: [
    //     {
    //       title: '자세히보기',
    //       link: {
    //         mobileWebUrl: link,
    //         webUrl: link,
    //       },
    //     },
    //   ],
    // });
  }, []);

  useEffect(() => {
    async function view(id: number) {
      await lawQnaView({
        ip_address: ipAddress !== '::1' ? ipAddress ?? '' : '',
        law_qna_id: id,
        device: getDevice(),
        browser: getBrowser(),
      });
    }

    if (lawQnaDetailData && typeof window !== 'undefined') {
      view(lawQnaDetailData.id);
    }
  }, [ipAddress, lawQnaDetailData]);

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
            <Popup.ActionButton onClick={() => router.popLast(true)}>확인</Popup.ActionButton>
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
