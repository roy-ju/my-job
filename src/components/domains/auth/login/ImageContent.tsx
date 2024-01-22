import Image from 'next/image';

import LoginImage from '@/../public/static/images/auth/login.png';

export default function ImageContent() {
  return (
    <div tw="[height: 290px] relative pt-8 pb-2 [padding-inline: 2.5px]">
      <Image src={LoginImage} alt="로그인 이미지" height={250} tw="w-full [height: 250px]" />
    </div>
  );
}
