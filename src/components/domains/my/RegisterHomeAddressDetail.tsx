import Container from '@/components/atoms/Container';

import { NavigationHeader } from '@/components/molecules';

import useHandleClickBack from './register-home-address-detail/hooks/useHandleClickBack';

import useInputHandler from './register-home-address-detail/hooks/useInputHandler';

import useRegisterHomeAddressDetailHandler from './register-home-address-detail/hooks/useRegisterHomeAddressDetailHandler';

import useRegisterMyHomeVerify from './register-home-address-detail/hooks/useRegisterMyHomeVerify';

import Notice from './register-home-address-detail/Notice';

import RegisterMyHomeAddressVerify from './register-home-address-detail/RegisterMyHomeAddressVerify';

import AddressDetail from '../realestate-helper/realestate-document-address-detail/AddressDetail';

import AddressLineInfo from '../realestate-helper/realestate-document-address-detail/AddressLineInfo';

import {
  FormContainer,
  Line,
  LineWrraper,
} from '../realestate-helper/realestate-document-address-detail/widget/RealestateDocumentAddressDetailWidget';

export default function RegisterHomeAddressDetail() {
  const { handleClickBack } = useHandleClickBack();

  const { addressLine1, addressLine2 } = useRegisterHomeAddressDetailHandler();

  const { dong, ho, handleChangeDong, handleChangeHo } = useInputHandler();

  const { handleVerifyMyHome } = useRegisterMyHomeVerify();

  return (
    <Container>
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={handleClickBack} />
        <NavigationHeader.Title>우리집 등록</NavigationHeader.Title>
      </NavigationHeader>
      <FormContainer>
        <AddressLineInfo firstLine={addressLine1} secondLine={addressLine2} />
        <LineWrraper>
          <Line />
        </LineWrraper>
        <AddressDetail
          type="registerMyHome"
          dong={dong}
          ho={ho}
          handleChangeDong={handleChangeDong}
          handleChangeHo={handleChangeHo}
          handleClickSearchAnotherAddress={handleClickBack}
        />
        <Notice />
      </FormContainer>
      <RegisterMyHomeAddressVerify handleClick={() => handleVerifyMyHome(dong, ho)} />
    </Container>
  );
}
