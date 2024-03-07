import { useCallback, useState } from 'react';

import { useRouter } from 'next/router';

import { toast } from 'react-toastify';

import kakaoShare from '@/utils/kakaoShare';

import Routes from '@/router/routes';

export default function useShareHandler() {
  const { query } = useRouter();

  const id = query?.dictID ?? 0;

  const [openSharePopup, setOpenSharePopup] = useState(false);

  const handleOpenSharePopup = useCallback(() => {
    setOpenSharePopup(true);
  }, []);

  const handleCloseSharePopup = useCallback(() => {
    setOpenSharePopup(false);
  }, []);

  const handleCopyUrl = useCallback(() => {
    const content = `[네고시오] 부동산 거래 도우미\n\n부동산 용어 사전\n\n${window.origin}/${Routes.DictionaryDetail}?dictID=${id}`;

    navigator.clipboard.writeText(content);

    toast.success('복사되었습니다.');

    setOpenSharePopup(false);
  }, [id]);

  const handleShareViaKakao = useCallback(() => {
    const link = `${window.origin}/${Routes.DictionaryDetail}?dictID=${id}`;

    kakaoShare({
      width: 1200,
      height: 630,
      objectType: 'feed',
      title: '',
      description: '',
      imgUrl: '',
      buttonTitle: '자세히보기',
      link,
    });

    setOpenSharePopup(false);
  }, [id]);

  return { openSharePopup, handleCopyUrl, handleShareViaKakao, handleOpenSharePopup, handleCloseSharePopup };
}
