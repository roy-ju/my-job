import { Button, Separator } from '@/components/atoms';
import { RegisterForm } from '@/components/organisms';

export default function Register() {
  return (
    <div tw="pt-12">
      <div>
        <RegisterForm.Email />
      </div>
      <div tw="my-10">
        <RegisterForm.Nickname />
      </div>
      <Separator />
      <div tw="my-10">
        <RegisterForm.PrivacyRetention />
      </div>
      <Separator />
      <div tw="my-10">
        <RegisterForm.Terms />
      </div>
      <div tw="mb-8 px-5">
        <Button disabled tw="w-full" size="bigger">
          다음
        </Button>
      </div>
    </div>
  );
}
