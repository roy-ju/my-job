import { NavigationHeader } from '@/components/molecules';

import { PersistentBottomBar, Button, Loading } from '@/components/atoms';

import ReportTextField from '../organisms/ReportTextField';

import useReportInput from '../../hooks/useReportInput';

import useChatRoomReportHandler from '../../hooks/useChatRoomReportHandler';

import useClientInit from '../../hooks/useClientInit';

export default function ChatRoomReport() {
  const { renderCondition } = useClientInit();

  const { reportValue, handleChange } = useReportInput();

  const { targetName, onClickReportButton, onClickBackButton } = useChatRoomReportHandler();

  if (!renderCondition) return null;

  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={onClickBackButton} />
        <NavigationHeader.Title tw="text-b1">신고하기</NavigationHeader.Title>
      </NavigationHeader>

      {renderCondition === 'loading' && <Loading tw="text-center mt-10" />}

      {renderCondition === 'render' && (
        <>
          <div tw="m-7 flex-1">
            <div tw="mb-1 text-b1  font-bold">{targetName}</div>
            <ReportTextField reportValue={reportValue} handleChange={handleChange} />
          </div>
          <PersistentBottomBar>
            <Button
              disabled={!reportValue}
              onClick={() => onClickReportButton(reportValue)}
              tw="w-full text-b2"
              size="bigger"
              variant="secondary"
            >
              신고하기
            </Button>
          </PersistentBottomBar>
        </>
      )}
    </div>
  );
}
