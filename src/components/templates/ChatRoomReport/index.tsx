import { NavigationHeader } from '@/components/molecules';
import { Button, PersistentBottomBar } from '@/components/atoms';
import ChatReportTextField from './ChatReportTextField';

interface CharRoomReportProps {
  officeName: string;
  listingTitle: string;
  additionalListingCount: number;

  reportContent?: string;
  onChangeReportContent?: (value: string) => void;
  onClickReportButton?: () => void;
  onClickBackButton?: () => void;
}

export default function CharRoomReport({
  officeName,
  listingTitle,
  additionalListingCount,
  reportContent,
  onChangeReportContent,
  onClickReportButton,
  onClickBackButton,
}: CharRoomReportProps) {
  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={onClickBackButton} />
        <NavigationHeader.Title tw="text-b1">신고하기</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="m-7 flex-1">
        <div tw="mb-1 text-b1  font-bold">{officeName}</div>
        <div tw="text-info mb-4 text-gray-700">
          {listingTitle + (additionalListingCount > 0 && ` 외 ${additionalListingCount}건`)}
        </div>
        <ChatReportTextField value={reportContent} onChangeValue={onChangeReportContent} />
      </div>
      <PersistentBottomBar>
        <Button
          disabled={!reportContent}
          onClick={onClickReportButton}
          tw="w-full text-b2"
          size="bigger"
          variant="secondary"
        >
          신고하기
        </Button>
      </PersistentBottomBar>
    </div>
  );
}
