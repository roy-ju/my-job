import { NavigationHeader, Information } from '@/components/molecules';
import { Button } from '@/components/atoms';
import { ChangeEvent, useState } from 'react';
import createServiceQna from '@/apis/serviceqna/createServiceQna';
import List, { IServiceContactItem } from './List';
import NoData from './Nodata';
import Inquiry from './Inquiry';

interface ServiceContactProps {
  list: IServiceContactItem[];
  loggedIn: boolean;
  mutateQna: () => void;
}

export default function ServiceContact({ list, loggedIn, mutateQna }: ServiceContactProps) {
  const [isInquiring, setIsInquiring] = useState(false);
  const [inquiryText, SetInquiryText] = useState('');
  const headerTitle = isInquiring ? '문의하기' : '서비스 문의';

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    SetInquiryText(value);
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
        setIsInquiring(true);
      }}
      variant="secondary"
      size="bigger"
      tw="w-full"
    >
      문의하기
    </Button>
  );

  const renderInquiry = () => (
    <Inquiry
      value={inquiryText}
      onChange={handleChange}
      placeholder="내용을 입력하세요 &#13;&#10;매물에 대한 문의는 중개사에게 문의하기를 이용하세요"
    />
  );
  const renderInquiryButton = () => (
    <Button
      onClick={async () => {
        setIsInquiring(false);
        await createServiceQna(inquiryText);
        mutateQna();
      }}
      variant="secondary"
      size="bigger"
      tw="w-full"
      disabled={!inquiryText}
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
          <div tw="flex-1">{isInquiring ? renderInquiry() : renderList()}</div>
          <div tw="w-full px-5 py-4 bg-white shadow-persistentBottomBar">
            {isInquiring ? renderInquiryButton() : renderListButton()}
          </div>
        </>
      ) : (
        <div tw="flex-1 flex flex-col justify-center items-center text-center">
          <Information>
            <Information.Title>
              <div tw="mb-1.5">
                <span tw="text-[#522AFF]">서비스 문의</span>가 없습니다.
              </div>
            </Information.Title>
            <Information.Contents>
              서비스 이용에 관한 궁금한 점을
              <br />
              네고시오에 직접 물어보세요.
            </Information.Contents>
          </Information>
          <Button variant="secondary" tw="mt-16 w-[6.7rem] text-b1 font-bold" size="bigger">
            문의하기
          </Button>
        </div>
      )}
    </div>
  );
}
