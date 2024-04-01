import { FormEventHandler, KeyboardEventHandler, useCallback } from 'react';

import Container from '@/components/atoms/Container';

import { MarginTopTwenty, MarginTopEight } from '@/components/atoms/Margin';

import { NavigationHeader } from '@/components/molecules';

import useKakaoAddressAutocomplete from '@/hooks/services/useKakaoAddressAutocomplete';

import {
  FlexContents,
  Form,
  FormContainer,
} from './realestate-document-search-address/widget/RealestateDocumentSearchAddressWidget';

import useHandleClickBack from './realestate-document-search-address/hooks/useHandleClickBack';

import useSummitAddress from './realestate-document-search-address/hooks/useSummitAddress';

import SearchAddressGuide from './realestate-document-search-address/SearchAddressGuide';

import Search from './realestate-document-search-address/Search';

import useSearchAddressInput from './realestate-document-search-address/hooks/useSearchAddressInput';

import AddressListItem from './realestate-document-search-address/AddressListItem';

export default function RealestateDocumentSearchAddress() {
  const { handleClickBack } = useHandleClickBack();

  const { handleSubmitAddress } = useSummitAddress();

  const { inputValue, handleChange } = useSearchAddressInput();

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault();
  }, []);

  const handleKeyPress = useCallback<KeyboardEventHandler<HTMLFormElement>>((e) => {
    if (e.key === 'Enter') {
      const input = document.getElementById('realesate-document-search-address');

      if (input) {
        input.blur();
      }

      e.preventDefault();
    }
  }, []);

  const results = useKakaoAddressAutocomplete(inputValue);

  return (
    <Container>
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={handleClickBack} />
        <NavigationHeader.Title>등기부 신규 조회</NavigationHeader.Title>
      </NavigationHeader>
      <FormContainer>
        <Form onSubmit={handleSubmit} onKeyPress={handleKeyPress}>
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
