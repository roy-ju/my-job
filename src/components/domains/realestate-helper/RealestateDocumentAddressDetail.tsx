import Container from '@/components/atoms/Container';

import { NavigationHeader } from '@/components/molecules';

import AddressLineInfo from './realestate-document-address-detail/AddressLineInfo';

import AddressDetail from './realestate-document-address-detail/AddressDetail';

import useHandleClickBack from './realestate-document-address-detail/hooks/useHandleClickBack';

import useInputHandler from './realestate-document-address-detail/hooks/useInputHandler';

import useRealestateDocumentAddressDetail from './realestate-document-address-detail/hooks/useRealestateDocumentAddressDetail';

import {
  FormContainer,
  LineWrraper,
  Line,
} from './realestate-document-address-detail/widget/RealestateDocumentAddressDetailWidget';

import DocumentCreate from './realestate-document-address-detail/DocumentCreate';

import Notice from './realestate-document-address-detail/Notice';
import useCreateRealestateDocument from './realestate-document-address-detail/hooks/useCreateRealestateDocument';

export default function RealestateDocumentAddressDetail() {
  const { handleClickBack } = useHandleClickBack();

  const { addressLine1, addressLine2 } = useRealestateDocumentAddressDetail();

  const { dong, ho, handleChangeDong, handleChangeHo } = useInputHandler();

  const { handleCreateDocument } = useCreateRealestateDocument();

  return (
    <Container tw="relative">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={handleClickBack} />
        <NavigationHeader.Title>등기부 신규 조회</NavigationHeader.Title>
      </NavigationHeader>
      <FormContainer>
        <AddressLineInfo firstLine={addressLine1} secondLine={addressLine2} />
        <LineWrraper>
          <Line />
        </LineWrraper>
        <AddressDetail dong={dong} ho={ho} handleChangeDong={handleChangeDong} handleChangeHo={handleChangeHo} />
        <Notice />
      </FormContainer>
      <DocumentCreate handleClick={() => handleCreateDocument(dong, ho)} />
    </Container>
  );
}
