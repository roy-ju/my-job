import { TextField } from '@/components/molecules';

interface Props {
  price?: string;
  onChangePrice?: (value: string) => void;
  monthlyRentFee?: string;
  onChangeMonthlyRentFee?: (value: string) => void;
}

export default function WolsaeForm({ price, onChangePrice, monthlyRentFee, onChangeMonthlyRentFee }: Props) {
  return (
    <div tw="py-7 px-5">
      <div tw="font-bold">희망가</div>
      <div tw="mt-3 mb-4 text-info text-gray-700">가격협상 중에는 언제든 희망가를 수정할 수 있습니다.</div>
      <div tw="flex flex-col gap-4">
        <div>
          <TextField variant="outlined">
            <TextField.PriceInput label="전세금" value={price} onChange={(e) => onChangePrice?.(e.target.value)} />
          </TextField>
          <TextField.PriceHelperMessage tw="mr-4">{price ?? ''}</TextField.PriceHelperMessage>
        </div>
        <div>
          <TextField variant="outlined">
            <TextField.PriceInput
              label="월차임"
              value={monthlyRentFee}
              onChange={(e) => onChangeMonthlyRentFee?.(e.target.value)}
            />
          </TextField>
          <TextField.PriceHelperMessage tw="mr-4">{monthlyRentFee ?? ''}</TextField.PriceHelperMessage>
        </div>
      </div>
    </div>
  );
}
