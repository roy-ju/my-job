import { useControlled } from '@/hooks/utils';
import { ChangeEventHandler, useCallback, useMemo, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/atoms';

interface Props {
  urls?: string[];
  onChange?: (urls: string[]) => void;
}

export default function Photos({ urls, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const defaultUrls = useMemo(() => [], []);
  const [values, setValues] = useControlled({
    controlled: urls,
    default: defaultUrls,
  });

  const openFileChooser = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    async (e) => {
      const fileUrls = Array.from(e.target.files ?? []).map((item) => URL.createObjectURL(item));
      const newValues = [...values, ...fileUrls];
      setValues(newValues);
      onChange?.(newValues);
    },
    [setValues, onChange, values],
  );

  return (
    <div tw="relative">
      <input
        tw="opacity-0 absolute left-0 right-0 pointer-events-none"
        ref={inputRef}
        type="file"
        multiple
        accept="image/png, image/jpg, image/jpeg"
        onChange={handleChange}
      />
      <div tw="flex flex-col gap-4">
        {(values?.length ?? 0) > 0 && (
          <div tw="flex min-w-0 flex-wrap gap-4">
            {values.map((item) => (
              <Image
                key={item}
                src={item}
                alt=""
                width={100}
                height={100}
                tw="w-[30%] h-24 bg-gray-100 object-cover rounded-lg"
              />
            ))}
          </div>
        )}
        <Button variant="gray" tw="w-full" onClick={openFileChooser}>
          + 사진 추가
        </Button>
      </div>
    </div>
  );
}
