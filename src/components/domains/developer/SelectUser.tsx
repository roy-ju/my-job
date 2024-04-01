import tw, { styled } from 'twin.macro';

import { Dropdown, TextField } from '@/components/molecules';

type SelectUserProps = {
  userNickname: string;
  userName: string;
  jwtOwners: string[];
  value: string;
  handleChange: (v: string) => void;
};

const Column = styled.div`
  ${tw`flex flex-col gap-2`}
`;

export default function SelectUser({ userNickname, userName, jwtOwners, value, handleChange }: SelectUserProps) {
  return (
    <>
      <Column>
        <TextField variant="outlined">
          <TextField.Input label="유저 닉네임" value={userNickname} />
        </TextField>
        <TextField variant="outlined">
          <TextField.Input label="유저 이름" value={userName} />
        </TextField>
      </Column>

      <Dropdown label="엑세스토큰" value={value} onChange={handleChange}>
        {jwtOwners?.map((item) => (
          <Dropdown.Option key={item} value={item}>
            {item}
          </Dropdown.Option>
        ))}
      </Dropdown>
    </>
  );
}
