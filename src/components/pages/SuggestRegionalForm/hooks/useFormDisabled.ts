import { useEffect, useState } from 'react';
import { FormsInfo } from '../reducer/types';
import useForm from './useForm';

export default function useFormDisabled() {
  const [nextButtonDisabled, setNextButtonDisabled] = useState(false);

  const form = useForm();

  useEffect(() => {
    setNextButtonDisabled(false);

    if (form && form?.forms) {
      const formList = form.forms;

      const currentForm = formList[formList.length - 1];

      if (currentForm === FormsInfo.BasicInfo) {
        if (
          !form?.formData?.bubjungdong ||
          !form?.formData?.realestateType ||
          form?.formData?.realestateType?.length === 0 ||
          !form?.formData?.buyOrRent ||
          !form?.formData?.price
        ) {
          setNextButtonDisabled(true);
        }
      }

      if (currentForm === FormsInfo.MoveInDate) {
        if (!form?.formData?.moveInDate) {
          setNextButtonDisabled(true);
        }
      }

      if (currentForm === FormsInfo.Purpose) {
        if (!form?.formData?.purpose) {
          setNextButtonDisabled(true);
        }

        if (form?.formData?.purpose === '투자') {
          if (form?.formData?.investAmount === '') {
            setNextButtonDisabled(true);
          }
        } else if (form?.formData?.purpose === '실거주') {
          if (!form?.formData?.moveInDate) {
            setNextButtonDisabled(true);
          }
        }
      }

      if (currentForm === FormsInfo.Option) {
        if (form?.formData?.interviewAvailabletimes?.length === 0) {
          setNextButtonDisabled(true);
        }
      }
    }
  }, [form]);

  return {
    nextButtonDisabled,
  };
}
