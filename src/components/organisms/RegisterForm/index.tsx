import { Button, Checkbox, Label } from '@/components/atoms';
import { TextField } from '@/components/molecules';
import tw from 'twin.macro';
import MyDetailForm from '../MyDetailForm';

const Container = tw.div``;

function Email() {
  return (
    <div tw="px-5">
      <div tw="text-h2 font-bold mb-1">계정 이메일</div>
      <div tw="text-info text-gray-700 mb-7">선택한 간편 로그인 서비스 계정의 이메일이 사용됩니다.</div>
      <TextField variant="outlined">
        <TextField.Input label="이메일" disabled />
      </TextField>
    </div>
  );
}

function Nickname() {
  return (
    <div tw="px-5">
      <div tw="text-h2 font-bold mb-7">닉네임</div>
      <TextField variant="outlined">
        <TextField.Input label="닉네임" />
      </TextField>
    </div>
  );
}

function PrivacyRetention() {
  return <MyDetailForm.PrivacyRetentionInfo />;
}

// interface TermsProps {
//   over19?: boolean;
//   service?: boolean;
//   privacy?: boolean;
//   location?: boolean;
//   notification?: boolean;
//   marketing?: boolean;
//   onChangeOver19?: (checked: boolean) => void;
//   onChangeService?: (checked: boolean) => void;
//   onChangePrivacy?: (checked: boolean) => void;
//   onChangeLocation?: (checked: boolean) => void;
//   onChangeNotification?: (checked: boolean) => void;
//   onChangeMarketing?: (checked: boolean) => void;
// }

function Terms() {
  //   {
  //   over19: over19Prop,
  //   service: serviceProp,
  //   privacy: privacyProp,
  //   location: locationProp,
  //   notification: notificationProp,
  //   marketing: marketingProp,
  //   onChangeOver19,
  //   onChangeService,
  //   onChangePrivacy,
  //   onChangeLocation,
  //   onChangeNotification,
  //   onChangeMarketing,
  // }: TermsProps
  // const [over19, setOver19] = useControlled({
  //   controlled: over19Prop,
  //   default: false,
  // });

  // const [service, setService] = useControlled({
  //   controlled: serviceProp,
  //   default: false,
  // });

  // const [privacy, setPrivacy] = useControlled({
  //   controlled: privacyProp,
  //   default: false,
  // });

  // const [location, setLocation] = useControlled({
  //   controlled: locationProp,
  //   default: false,
  // });

  // const [notification, setNotification] = useControlled({
  //   controlled: notificationProp,
  //   default: false,
  // });

  // const [marketing, setMarketing] = useControlled({
  //   controlled: marketingProp,
  //   default: false,
  // });

  // const handleChangeOver19 = useCallback<ChangeEventHandler<HTMLInputElement>>(
  //   (e) => {
  //     setOver19(e.target.checked);
  //     onChangeOver19?.(e.target.checked);
  //   },
  //   [setOver19, onChangeOver19],
  // );

  // const handleChangeService = useCallback<ChangeEventHandler<HTMLInputElement>>(
  //   (e) => {
  //     setService(e.target.checked);
  //     onChangeService?.(e.target.checked);
  //   },
  //   [setService, onChangeService],
  // );

  // const handleChangePrivacy = useCallback<ChangeEventHandler<HTMLInputElement>>(
  //   (e) => {
  //     setPrivacy(e.target.checked);
  //     onChangePrivacy?.(e.target.checked);
  //   },
  //   [setPrivacy, onChangePrivacy],
  // );

  // const handleChangeLocation = useCallback<ChangeEventHandler<HTMLInputElement>>(
  //   (e) => {
  //     setLocation(e.target.checked);
  //     onChangeLocation?.(e.target.checked);
  //   },
  //   [setLocation, onChangeLocation],
  // );

  return (
    <div tw="px-5 flex flex-col">
      <div tw="pb-4 border-b border-b-gray-100">
        <Label control={<Checkbox />} label="전체 동의 및 확인" />
      </div>
      <div tw="pt-4 flex flex-col gap-4">
        <Label control={<Checkbox />} label="(필수) 만 19세 이상" />
        <div tw="flex items-center justify-between">
          <Label control={<Checkbox />} label="(필수) 서비스 이용약관 동의" />
          <Button variant="ghost" size="none" tw="underline font-bold text-info text-gray-500">
            보기
          </Button>
        </div>
        <div tw="flex items-center justify-between">
          <Label control={<Checkbox />} label="(필수) 개인정보 수집 및 이용 동의" />
          <Button variant="ghost" size="none" tw="underline font-bold text-info text-gray-500">
            보기
          </Button>
        </div>
        <div tw="flex items-center justify-between">
          <Label control={<Checkbox />} label="(필수) 위치기반 서비스 이용 동의" />
          <Button variant="ghost" size="none" tw="underline font-bold text-info text-gray-500">
            보기
          </Button>
        </div>
        <Label control={<Checkbox />} label="(필수) 거래 알림 수신 동의" />
        <Label control={<Checkbox />} label="(선택) 이벤트/마케팅 정보 수신 동의" />
      </div>
    </div>
  );
}

export default Object.assign(Container, { Email, Nickname, PrivacyRetention, Terms });
