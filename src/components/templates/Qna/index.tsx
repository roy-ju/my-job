import { NavigationHeader } from '@/components/molecules';
import { Button } from '@/components/atoms';
import { ChangeEvent, useState } from 'react';
import createServiceQna from '@/apis/serviceqna/createServiceQna';
import List, { IQnaItem } from './List';
import NoData from './Nodata';
import Inquiry from './Qna';

interface QnaProps {
  list: IQnaItem[];
  loggedIn: boolean;
  mutateQna: () => void;
}

export default function Qna({ list, loggedIn, mutateQna }: QnaProps) {
  const [isQna, setIsQna] = useState(false);
  const [qnaText, SetQnaText] = useState('');
  const headerTitle = isQna ? '문의하기' : '서비스 문의';

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    SetQnaText(value);
  };

  const renderList = () => {
    if (list.length > 0) return <List list={list} />;
    return (
      <div tw="mt-12">
        <NoData />
      </div>
    );
  };

  const renderListButton = () => (
    <Button
      onClick={() => {
        setIsQna(true);
      }}
      variant="secondary"
      size="bigger"
      tw="w-full"
    >
      문의하기
    </Button>
  );

  const renderQna = () => (
    <Inquiry
      value={qnaText}
      onChange={handleChange}
      placeholder="내용을 입력하세요 &#13;&#10;매물에 대한 문의는 중개사에게 문의하기를 이용하세요"
    />
  );
  const renderQnaButton = () => (
    <Button
      onClick={async () => {
        setIsQna(false);
        await createServiceQna(qnaText);
        mutateQna();
      }}
      variant="secondary"
      size="bigger"
      tw="w-full"
      disabled={!qnaText}
    >
      문의하기
    </Button>
  );

  return (
    <div tw="relative flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.Title>{headerTitle}</NavigationHeader.Title>
      </NavigationHeader>
      {loggedIn ? (
        <>
          <div tw="flex-1">{isQna ? renderQna() : renderList()}</div>
          <div tw="w-full px-5 py-4 bg-white shadow-persistentBottomBar">
            {isQna ? renderQnaButton() : renderListButton()}
          </div>
        </>
      ) : (
        <>
          <div tw="flex-1">{renderList()}</div>
          <div tw="w-full px-5 py-4 bg-white shadow-persistentBottomBar">{renderListButton()}</div>
        </>
      )}
    </div>
  );
}
