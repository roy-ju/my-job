import { Button } from '@/components/atoms';
import { ChangeEvent, useEffect, useState } from 'react';
import createServiceQna from '@/apis/serviceqna/createServiceQna';
import { MobGlobalHeader } from '@/components/organisms';
import List, { IQnaItem } from './List';
import NoData from './Nodata';
import Inquiry from './Qna';

interface QnaProps {
  list: IQnaItem[];
  loggedIn: boolean;
  mutateQna: () => void;
}

export default function MobQna({ list, loggedIn, mutateQna }: QnaProps) {
  const [isQna, setIsQna] = useState(false);
  const [qnaText, SetQnaText] = useState('');
  const headerTitle = isQna ? '문의하기' : '서비스 문의';

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    SetQnaText(value);
  };

  useEffect(() => {
    SetQnaText('');
  }, [isQna]);

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
      placeholder="내용을 입력하세요. &#13;&#10;매물에 대한 문의는 중개사에게 문의하기를 이용하세요"
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
    <div tw="flex flex-col w-full max-w-mobile mx-auto h-full bg-white">
      <MobGlobalHeader
        title={headerTitle}
        onClickBack={
          isQna
            ? () => {
                setIsQna(false);
              }
            : undefined
        }
      />
      {loggedIn ? (
        <>
          <div tw="flex-1 mt-[3.5rem] mb-[5.5rem] overflow-y-auto">
            {isQna ? <div tw="mt-[1rem]">{renderQna()}</div> : renderList()}
          </div>
          <div tw="w-full max-w-mobile fixed bottom-0 left-auto right-auto px-5 py-4 bg-white shadow-persistentBottomBar">
            {isQna ? renderQnaButton() : renderListButton()}
          </div>
        </>
      ) : (
        <>
          <div tw="flex-1 mt-[3.5rem] mb-[5.5rem] overflow-y-auto">{renderList()}</div>
          <div tw="w-full max-w-mobile fixed bottom-0 left-auto right-auto px-5 py-4 bg-white shadow-persistentBottomBar">
            {renderListButton()}
          </div>
        </>
      )}
    </div>
  );
}
