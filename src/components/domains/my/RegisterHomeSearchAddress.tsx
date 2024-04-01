import { FormEventHandler, useCallback } from 'react';

import Container from '@/components/atoms/Container';

import { NavigationHeader } from '@/components/molecules';

import { MarginTopEight, MarginTopTwenty } from '@/components/atoms/Margin';

import useKakaoAddressAutocomplete from '@/hooks/services/useKakaoAddressAutocomplete';

import useHandleClickBack from './register-home-search-address/hooks/useHandleClickBack';

import useSummitAddress from './register-home-search-address/hooks/useSubmitAddress';

import useSearchAddressInput from './register-home-search-address/hooks/useSearchAddressInput';

import {
  Form,
  FormContainer,
  FlexContents,
} from '../realestate-helper/realestate-document-search-address/widget/RealestateDocumentSearchAddressWidget';

import Search from '../realestate-helper/realestate-document-search-address/Search';

import SearchAddressGuide from '../realestate-helper/realestate-document-search-address/SearchAddressGuide';

import AddressListItem from '../realestate-helper/realestate-document-search-address/AddressListItem';

export default function RegisterdHomeSearchAddress() {
  const { handleClickBack } = useHandleClickBack();

  const { handleSubmitAddress } = useSummitAddress();

  const { inputValue, handleChange } = useSearchAddressInput();

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault();
  }, []);

  const results = useKakaoAddressAutocomplete(inputValue);

  return (
    <Container>
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={handleClickBack} />
        <NavigationHeader.Title>우리집 등록</NavigationHeader.Title>
      </NavigationHeader>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <MarginTopTwenty />
          <Search value={inputValue} handleChange={handleChange} />
          <MarginTopTwenty />
          <FlexContents>
            {!results.length && <SearchAddressGuide />}
            {results.length > 0 && <MarginTopEight />}
            {results.length > 0 &&
              results.map((item) => (
                <AddressListItem key={item.id} item={item} handleClickItem={handleSubmitAddress} />
              ))}
          </FlexContents>
        </Form>
      </FormContainer>
    </Container>
  );
}
