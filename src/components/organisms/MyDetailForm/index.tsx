import { Button, Separator as BaseSeparator, Ul } from '@/components/atoms';
import { Dropdown, TextField } from '@/components/molecules';
import tw from 'twin.macro';
import SelectedIcon from '@/assets/icons/selected.svg';

interface UpdatetableTextFieldProps {
  label: string;
  value?: string;
  disabled?: boolean;
  readOnly?: boolean;
  onClickUpdate?: () => void;
}

function UpdatableTextField({
  label,
  value,
  disabled = false,
  readOnly = false,
  onClickUpdate,
}: UpdatetableTextFieldProps) {
  return (
    <TextField variant="outlined">
      <TextField.Input value={value} label={label} disabled={disabled} readOnly={readOnly} />
      <TextField.Trailing>
        <Button size="small" variant="gray" onClick={onClickUpdate}>
          변경
        </Button>
      </TextField.Trailing>
    </TextField>
  );
}

interface HomeOwnerProps {
  verified: boolean;
}

function HomeOwner({ verified }: HomeOwnerProps) {
  return (
    <div
      css={[
        tw`flex items-center gap-2 px-6 py-3 rounded-lg`,
        verified ? tw`bg-nego-100 text-nego-1000` : tw`text-gray-700 bg-gray-200`,
      ]}
    >
      <div
        css={[tw`flex items-center justify-center w-6 h-6 rounded-full`, verified ? tw`bg-nego-800` : tw`bg-gray-500`]}
      >
        <SelectedIcon tw="text-white" />
      </div>
      <div tw="leading-6 text-b2 pt-px font-bold">
        {verified ? '집주인으로 인증되었습니다.' : '집주인으로 확인되지 않았습니다.'}
      </div>
    </div>
  );
}

interface LoginInfoProps {
  nickname?: string;
  email?: string;
  onClickLogout?: () => void;
}

function LoginInfo({ nickname, email, onClickLogout }: LoginInfoProps) {
  return (
    <div tw="px-5">
      <div tw="flex items-center justify-between mb-4">
        <div tw="text-b1 leading-4 font-bold">로그인 정보</div>
        <Button variant="ghost" size="none" tw="text-info leading-4 underline" onClick={onClickLogout}>
          로그아웃
        </Button>
      </div>
      <div tw="flex flex-col gap-3">
        <UpdatableTextField label="닉네임" value={nickname} />
        <UpdatableTextField label="간편 로그인" readOnly value={email} />
      </div>
    </div>
  );
}

interface IdentityInfoProps {
  name?: string;
  phone?: string;
}

function IdentityInfo({ name, phone }: IdentityInfoProps) {
  return (
    <div tw="px-5">
      <div tw="flex flex-col gap-3 mb-4">
        <div tw="text-b1 leading-4 font-bold">본인인증 정보</div>
        <Ul>
          {!name && !phone && <li>매물등록신청, 거래 참여 등을 하기 위해서는 본인인증이 필요합니다</li>}
          {name && !phone && <li>휴대폰 번혼를 등록하시면 중요한 알림을 받으실 수 있습니다</li>}
        </Ul>
      </div>
      <div tw="flex flex-col gap-3">
        {name && (
          <TextField>
            <TextField.Input label="실명" disabled value={name} />
          </TextField>
        )}
        {!name && (
          <Button variant="secondary" tw="font-bold">
            본인인증하기
          </Button>
        )}
        {phone && <UpdatableTextField label="휴대폰 번호" value={phone} />}
        {name && !phone && <Button variant="outlined">휴대폰 번호 등록하기</Button>}
      </div>
    </div>
  );
}

interface AddressInfoProps {
  address?: string;
  addressDetail?: string;
  verified?: boolean;
  onClickUpdateAddress?: () => void;
}

function AddressInfo({ address, addressDetail, verified = false, onClickUpdateAddress }: AddressInfoProps) {
  return (
    <div tw="px-5">
      <div tw="flex items-center justify-between mb-3">
        <div tw="text-b1 leading-4 font-bold">주소 정보</div>
      </div>
      <Ul tw="text-info text-gray-700 mb-4">
        <li>거주 또는 소유하신 부동산의 주소를 입력해 주세요.</li>
        <li>등록하신 주소지의 단지 및 주변 지역에 대한 신규 매물 및 실거래가 정보를 알려드립니다.</li>
      </Ul>
      {address ? (
        <div tw="flex flex-col gap-3">
          <TextField variant="outlined">
            <TextField.Input label="주소" value={address} readOnly />
          </TextField>
          <UpdatableTextField label="상세 주소" value={addressDetail} onClickUpdate={onClickUpdateAddress} />
          <HomeOwner verified={verified} />
        </div>
      ) : (
        <Button onClick={onClickUpdateAddress} tw="w-full font-bold" variant="secondary">
          주소 등록하기
        </Button>
      )}
    </div>
  );
}

function PrivacyRetentionInfo() {
  return (
    <div tw="px-5">
      <div tw="flex items-center justify-between mb-3">
        <div tw="text-b1 leading-4 font-bold">개인정보 보관기간</div>
      </div>
      <Ul tw="text-info text-gray-700 mb-4">
        <li>개인정보를 파기 또는 분리 저장, 관리해야 하는 서비스 미이용 기간을 선택 해 주세요.</li>
        <li>선택한 기간동안 서비스를 이용하지 않을 경우 휴면 계정으로 전환 또는 가입해지 됩니다.</li>
      </Ul>
      <div tw="flex flex-col gap-3">
        <Dropdown value="탈퇴시까지">
          <Dropdown.Option value="1년">1년</Dropdown.Option>
          <Dropdown.Option value="3년">3년</Dropdown.Option>
          <Dropdown.Option value="5년">5년</Dropdown.Option>
          <Dropdown.Option value="탈퇴시까지">탈퇴시까지</Dropdown.Option>
        </Dropdown>
      </div>
    </div>
  );
}

const Separator = tw(BaseSeparator)`my-10`;

const Container = tw.div``;

export default Object.assign(Container, { LoginInfo, IdentityInfo, AddressInfo, PrivacyRetentionInfo, Separator });
