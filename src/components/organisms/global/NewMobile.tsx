import Image from 'next/image';

import { useReadLocalStorage } from 'usehooks-ts';

import SpeeachBubble from '@/../public/static/images/speech_bubble.png';

import LocalStorageValue from '@/constants/localStorageValues';

export default function NewMobile() {
  const value = useReadLocalStorage(LocalStorageValue.firstVisitInSubHome);

  return value !== '1' ? (
    <Image
      src={SpeeachBubble.src}
      alt="speeach_bubble"
      width={61}
      height={33.6}
      tw="absolute [top: -29.3px] [z-index: 301]"
    />
  ) : null;
}
