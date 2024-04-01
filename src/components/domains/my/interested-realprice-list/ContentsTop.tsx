import Moment from '@/components/atoms/Moment';

import { Content, Time, Nickname } from './widget/TopWidget';

type ContentsTopProps = {
  nickname: string;
  time?: string;
};

export default function ContentsTop({ nickname, time }: ContentsTopProps) {
  return (
    <>
      <Nickname>{nickname}님이 관심 가질 만한 실거래 정보</Nickname>
      <Content>나의 관심 매물, 관심 단지 혹은 나의 주소지 주변 실거래 현황입니다.</Content>
      <Time>최근 업데이트: {time ? <Moment format="YYYY.MM.DD">{time}</Moment> : '없음'}</Time>
    </>
  );
}
