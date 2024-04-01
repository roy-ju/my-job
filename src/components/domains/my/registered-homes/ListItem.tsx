import RegisteredhomeIcon from '@/assets/icons/registered_home_24.svg';

import ErrorIcon from '@/assets/icons/error_12.svg';

import CloseContainedIcon from '@/assets/icons/close_contained.svg';

import { ListItemContainer, NotVerifedWrraper } from './widget/RegisteredHomesWidget';

export interface ListItemProps {
  roadnameAddress?: string;
  addressDetail?: string;
  notVerified?: boolean;
  onClickDeleteIcon?: () => void;
  onClickSendSMS?: () => void;
}

export default function ListItem({
  roadnameAddress,
  addressDetail,
  notVerified,
  onClickDeleteIcon,
  onClickSendSMS,
}: ListItemProps) {
  return (
    <ListItemContainer>
      <RegisteredhomeIcon />

      <div>
        <p>{roadnameAddress}</p>
        <p>{addressDetail}</p>

        {notVerified && (
          <NotVerifedWrraper>
            <ErrorIcon />
            <span>소유자 인증 대기중입니다.</span>
            <button type="button" onClick={onClickSendSMS}>
              인증 재전송
            </button>
          </NotVerifedWrraper>
        )}
      </div>

      <button type="button" tw="ml-auto" onClick={onClickDeleteIcon}>
        <CloseContainedIcon />
      </button>
    </ListItemContainer>
  );
}
