import { useCallback, useState } from 'react';

import HTML_SERVICE_20230322 from '@/assets/terms/service_agreement/20230322';

import HTML_SERVICE_20221208 from '@/assets/terms/service_agreement/20221208';

import HTML_SERVICE_20221103 from '@/assets/terms/service_agreement/20221103';

import HTML_SERVICE_20221017 from '@/assets/terms/service_agreement/20221017';

import HTML_LOCATION_20221017 from '@/assets/terms/location_agreement/20221017';

import HTML_LOCATION_20221103 from '@/assets/terms/location_agreement/20221103';

import HTML_PRIVACY_20221017 from '@/assets/terms/privacy_agreement/20221017';

import HTML_PRIVACY_20221103 from '@/assets/terms/privacy_agreement/20221103';

import HTML_PRIVACY_20221208 from '@/assets/terms/privacy_agreement/20221208';

import HTML_PRIVACY_20231211 from '@/assets/terms/privacy_agreement/20231211';

import HTML_PRIVACY_20240213 from '@/assets/terms/privacy_agreement/20240213';

export default function useRegisterTerms() {
  const [selectedServiceTerms, setSelectedServiceTerms] = useState('2023.03.22');

  const [selectedLocationTerms, setSelectedLocationTerms] = useState('2022.11.03');

  const [selectedPrivacyTerms, setSelectedPrivacyTerms] = useState('2024.02.13');

  const selectedServiceHtmlTerms = (() => {
    switch (selectedServiceTerms) {
      case '2022.12.08':
        return HTML_SERVICE_20221208;
      case '2022.11.03':
        return HTML_SERVICE_20221103;
      case '2022.10.17':
        return HTML_SERVICE_20221017;
      default:
        return HTML_SERVICE_20230322;
    }
  })();

  const selectedLocationHtmlTerms = (() => {
    switch (selectedLocationTerms) {
      case '2022.10.17':
        return HTML_LOCATION_20221017;
      default:
        return HTML_LOCATION_20221103;
    }
  })();

  const selectedPrivacyHtmlTerms = (() => {
    switch (selectedPrivacyTerms) {
      case '2022.11.03':
        return HTML_PRIVACY_20221103;
      case '2022.10.17':
        return HTML_PRIVACY_20221017;
      case '2022.12.08':
        return HTML_PRIVACY_20221208;
      case '2023.12.11':
        return HTML_PRIVACY_20231211;
      default:
        return HTML_PRIVACY_20240213;
    }
  })();

  const handleChangeSelectedSeviceTerms = useCallback(
    (value: string) => {
      setSelectedServiceTerms(value);
    },
    [setSelectedServiceTerms],
  );

  const handleChangeSelectedLocationTerms = useCallback(
    (value: string) => {
      setSelectedLocationTerms(value);
    },
    [setSelectedLocationTerms],
  );

  const handleChangeSelectedPrivacyTerms = useCallback(
    (value: string) => {
      setSelectedPrivacyTerms(value);
    },
    [setSelectedPrivacyTerms],
  );

  return {
    selectedServiceTerms,
    selectedLocationTerms,
    selectedPrivacyTerms,
    selectedServiceHtmlTerms,
    selectedLocationHtmlTerms,
    selectedPrivacyHtmlTerms,
    handleChangeSelectedSeviceTerms,
    handleChangeSelectedLocationTerms,
    handleChangeSelectedPrivacyTerms,
  };
}
