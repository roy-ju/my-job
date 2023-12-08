import React from 'react';
import RegisteredhomeIcon from '@/assets/icons/registered_home_24.svg';
import ErrorIcon from '@/assets/icons/error_12.svg';
import CloseContainedIcon from '@/assets/icons/close_contained.svg';

export interface MyRegisteredHomesListItemProps {
  roadnameAddress?: string;
  addressDetail?: string;
  notVerified?: boolean;
  onClickDeleteIcon?: () => void;
  onClickSendSMS?: () => void;
}

export default function MyRegisteredHomesListItem({
  roadnameAddress,
  addressDetail,
  notVerified,
  onClickDeleteIcon,
  onClickSendSMS,
}: MyRegisteredHomesListItemProps) {
  return (
    <>
      <div tw="bg-white py-3 flex items-center gap-2 w-full hover:bg-gray-100">
        <RegisteredhomeIcon />
        <div>
          <p tw="text-b1 font-bold">{roadnameAddress}</p>
          <p tw="text-info [line-height: 14px] text-gray-700">{addressDetail}</p>
          {notVerified && (
            <div tw="flex items-center gap-1 text-info [line-height: 14px] mt-1">
              <ErrorIcon />
              <span tw="text-red-800">소유자 인증 대기중입니다.</span>
              <button
                type="button"
                tw="text-gray-600 [text-decoration-line: underline] hover:text-gray-1000"
                onClick={onClickSendSMS}
              >
                인증 재전송
              </button>
            </div>
          )}
        </div>

        <button type="button" tw="ml-auto" onClick={onClickDeleteIcon}>
          <CloseContainedIcon />
        </button>
      </div>
    </>
  );
}
