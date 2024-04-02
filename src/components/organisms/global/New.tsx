import Image from 'next/image';

import { useReadLocalStorage } from 'usehooks-ts';

import SpeeachBubble from '@/../public/static/images/speech_bubble_horizontal.png';

import LocalStorageValue from '@/constants/localStorageValues';

export default function New() {
  const value = useReadLocalStorage(LocalStorageValue.firstVisitInSubHome);

  return value !== '1' ? (
    <Image
      src={SpeeachBubble.src}
      alt="speeach_bubble"
      width={68}
      height={28}
      tw="absolute [top: 189px] [left: 50px]"
      style={{ zIndex: 300 }}
    />
  ) : null;
}
