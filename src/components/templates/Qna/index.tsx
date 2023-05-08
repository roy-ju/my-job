import { NavigationHeader } from '@/components/molecules';
import { Button } from '@/components/atoms';
import React, { ChangeEvent, useState } from 'react';
import createServiceQna from '@/apis/serviceqna/createServiceQna';
import List, { IQnaItem } from './List';
import NoData from './Nodata';
import Inquiry from './Qna';

interface QnaProps {
  list: IQnaItem[];
  loggedIn: boolean;
  mutateQna: () => void;
  onClickBack?: () => void;
}

export default function Qna({ list, loggedIn, mutateQna, onClickBack }: QnaProps) {
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
        SetQnaText('');
        mutateQna();
      }}
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
        {isQna ? (
          <NavigationHeader.BackButton onClick={() => setIsQna(false)} />
        ) : onClickBack ? (
          <NavigationHeader.BackButton onClick={onClickBack} />
        ) : null}
        <NavigationHeader.Title>{headerTitle}</NavigationHeader.Title>
      </NavigationHeader>
      {loggedIn ? (
        <>
          <div tw="flex-1 overflow-y-auto">{isQna ? renderQna() : renderList()}</div>
          <div tw="w-full px-5 py-4 bg-white shadow-persistentBottomBar">
            {isQna ? renderQnaButton() : renderListButton()}
          </div>
        </>
      ) : (
        <>
          <div tw="flex-1 overflow-y-auto">{renderList()}</div>
          <div tw="w-full px-5 py-4 bg-white shadow-persistentBottomBar">{renderListButton()}</div>
        </>
      )}
    </div>
  );
}
