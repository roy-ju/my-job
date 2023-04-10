import { Button, Separator } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { useControlled } from '@/hooks/utils';
import { useCallback, useMemo } from 'react';
import FormContext from './FormContext';
import FormRenderer, { Forms } from './FormRenderer';

export interface ListingCreateFormProps {
  addressLine1: string;
  addressLine2: string;

  forms?: string[];
  isOwner?: boolean;
  ownerName?: string;
  ownerPhone?: string;
  buyOrRent?: number;
  price?: string;
  monthlyRentFee?: string;
  onChangeIsOwner?: (value: boolean) => void;
  onChangeOwnerName?: (value: string) => void;
  onChangeOwnerPhone?: (value: string) => void;
  onChangeBuyOrRent?: (value: number) => void;
  onChangePrice?: (value: string) => void;
  onChnageMonthlyRentFee?: (value: string) => void;
  onClickNext?: () => void;
}

export default function ListingCreateForm({
  addressLine1,
  addressLine2,

  forms: formsProp,
  isOwner: isOwnerProp,
  ownerName: ownerNameProp,
  ownerPhone: ownerPhoneProp,
  buyOrRent: buyOrRentProp,
  price: priceProp,
  monthlyRentFee: monthlyRentFeeProp,
  onChangeIsOwner,
  onChangeOwnerName,
  onChangeOwnerPhone,
  onChangeBuyOrRent,
  onChangePrice,
  onChnageMonthlyRentFee,
  onClickNext,
}: ListingCreateFormProps) {
  const defaultForms = useMemo(() => [Forms.IsOwner], []);
  const [forms] = useControlled({ controlled: formsProp, default: defaultForms });

  const [isOwner, setIsOwner] = useControlled({ controlled: isOwnerProp, default: true });
  const [ownerName, setOwnerName] = useControlled({ controlled: ownerNameProp, default: '' });
  const [ownerPhone, setOwnerPhone] = useControlled({ controlled: ownerPhoneProp, default: '' });
  const [buyOrRent, setBuyOrRent] = useControlled({ controlled: buyOrRentProp, default: 0 });
  const [price, setPrice] = useControlled({ controlled: priceProp, default: '' });
  const [monthlyRentFee, setMonthlyRentFee] = useControlled({ controlled: monthlyRentFeeProp, default: '' });

  const handleChangeIsOwner = useCallback(
    (value: boolean) => {
      setIsOwner(value);
      onChangeIsOwner?.(value);
    },
    [setIsOwner, onChangeIsOwner],
  );

  const handleChangeOwnerName = useCallback(
    (value: string) => {
      setOwnerName(value);
      onChangeOwnerName?.(value);
    },
    [setOwnerName, onChangeOwnerName],
  );

  const handleChangeOwnerPhone = useCallback(
    (value: string) => {
      setOwnerPhone(value);
      onChangeOwnerPhone?.(value);
    },
    [setOwnerPhone, onChangeOwnerPhone],
  );

  const handleChangeBuyOrRent = useCallback(
    (value: number) => {
      setBuyOrRent(value);
      onChangeBuyOrRent?.(value);
    },
    [setBuyOrRent, onChangeBuyOrRent],
  );

  const handleChangePrice = useCallback(
    (value: string) => {
      setPrice(value);
      onChangePrice?.(value);
    },
    [setPrice, onChangePrice],
  );

  const handleChangeMonthlyRentFee = useCallback(
    (value: string) => {
      setMonthlyRentFee(value);
      onChnageMonthlyRentFee?.(value);
    },
    [setMonthlyRentFee, onChnageMonthlyRentFee],
  );

  const context = useMemo(
    () => ({
      isOwner,
      ownerName,
      ownerPhone,
      buyOrRent,
      price,
      monthlyRentFee,
      onChangeIsOwner: handleChangeIsOwner,
      onChangeOwnerName: handleChangeOwnerName,
      onChangeOwnerPhone: handleChangeOwnerPhone,
      onChangeBuyOrRent: handleChangeBuyOrRent,
      onChangePrice: handleChangePrice,
      onChangeMonthlyRentFee: handleChangeMonthlyRentFee,
    }),
    [
      isOwner,
      ownerName,
      ownerPhone,
      buyOrRent,
      price,
      monthlyRentFee,
      handleChangeIsOwner,
      handleChangeOwnerName,
      handleChangeOwnerPhone,
      handleChangeBuyOrRent,
      handleChangePrice,
      handleChangeMonthlyRentFee,
    ],
  );

  const handleClickNext = useCallback(() => {
    onClickNext?.();
  }, [onClickNext]);

  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.Title>매물등록 신청</NavigationHeader.Title>
      </NavigationHeader>
      <FormContext.Provider value={context}>
        <div tw="flex-1 min-h-0 overflow-auto">
          <div tw="px-5 pt-6 pb-10">
            <div tw="text-b1 leading-none font-bold mb-3">매물 주소</div>
            <div tw="text-b1">{addressLine1}</div>
            <div tw="text-info">{addressLine2}</div>
          </div>
          <Separator />
          {forms.map((form, index) => (
            <div key={form}>
              <FormRenderer form={form} />
              {forms.length !== index + 1 && <Separator />}
            </div>
          ))}

          <div tw="px-5 pb-20">
            <Button onClick={handleClickNext} tw="w-full" size="bigger">
              다음
            </Button>
          </div>
        </div>
      </FormContext.Provider>
    </div>
  );
}
