import tw, { styled } from 'twin.macro';

const Container = styled.div`
  ${tw`flex flex-row items-center justify-center gap-3 p-5 mt-5`}
`;

const HorizontalSeperator = styled.div`
  ${tw`[width: 1px] [height: 12px] bg-gray-300`}
`;

const TextButton = styled.button`
  ${tw`text-gray-500 text-body_02`}
`;

type LogoutAndDeregisterProps = {
  handleClickLogout: () => void;
  handleClickDeregister: () => void;
};

export default function LogoutAndDeregister({ handleClickLogout, handleClickDeregister }: LogoutAndDeregisterProps) {
  return (
    <Container>
      <TextButton onClick={handleClickLogout}>로그아웃</TextButton>
      <HorizontalSeperator />
      <TextButton onClick={handleClickDeregister}>회원탈퇴</TextButton>
    </Container>
  );
}
