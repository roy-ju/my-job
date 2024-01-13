import useControlled from '@/hooks/useControlled';
import { ChangeEventHandler, useCallback, useMemo, useRef } from 'react';
import { Button } from '@/components/atoms';
import PlusIcon from '@/assets/icons/plus.svg';
import CloseIcon from '@/assets/icons/close.svg';
import { toast } from 'react-toastify';
import loadImage from 'blueimp-load-image';

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
      let validated = true;

      const newFiles: File[] = [];

      Array.from(e.target.files ?? []).forEach((item) => {
        const ext = item.name.split('.').pop();

        if (!ext || !['PNG', 'JPEG', 'JPG', 'JFIF', 'png', 'jpg', 'jpeg', 'jfif'].includes(ext)) {
          validated = false;
        }
      });

      if (!validated) {
        toast.error('png, jpg, jpeg, jfif 확장자만 업로드 가능합니다.');
        return;
      }

      const processFile = async (file: File) =>
        new Promise<void>((resolve) => {
          loadImage(
            file,
            // @ts-ignore
            (img, _) => {
              // @ts-ignore
              img.toBlob((blob) => {
                const rotateFile = new File([blob], file.name, {
                  type: file.type,
                });
                newFiles.push(rotateFile);
                resolve();
              }, file.type);
            },
            {
              canvas: true,
              meta: true,
              orientation: true,
            },
          );
        });

      const filePromises = Array.from(e.target.files ?? []).map(processFile);

      await Promise.all(filePromises);

      const fileUrls = Array.from(newFiles ?? []).map((item) => URL.createObjectURL(item));

      const newValues = [...values, ...fileUrls];

      setValues(newValues);
      onChange?.(newValues);

      if (inputRef.current) {
        inputRef.current.value = '';
      }
    },
    [setValues, onChange, values],
  );

  const handleDeleteByIndex = useCallback(
    (index: number) => {
      const newValues = [...values];
      newValues.splice(index, 1);
      setValues(newValues);
      onChange?.(newValues);
    },
    [setValues, values, onChange],
  );

  return (
    <div tw="relative">
      <input
        tw="opacity-0 absolute left-0 right-0 pointer-events-none"
        ref={inputRef}
        type="file"
        multiple
        accept="image/png, image/jpg, image/jpeg, image/jfif"
        onChange={handleChange}
      />
      <div tw="flex flex-col gap-4">
        {(values?.length ?? 0) > 0 && (
          <div tw="flex min-w-0 flex-wrap gap-4">
            {values.map((item, index) => (
              <div
                key={item}
                tw="relative w-[30%] h-24 bg-gray-100 rounded-lg bg-no-repeat bg-center bg-cover"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('${item}')`,
                }}
              >
                <Button
                  onClick={() => handleDeleteByIndex(index)}
                  variant="ghost"
                  size="none"
                  tw="w-5 h-5 bg-white absolute top-2 right-2 rounded-lg hover:bg-gray-400"
                >
                  <CloseIcon />
                </Button>
              </div>
            ))}
            {values.length < 6 && (
              <Button variant="gray" size="none" tw="w-[30%] h-24" onClick={openFileChooser}>
                <PlusIcon tw="text-gray-900" />
              </Button>
            )}
          </div>
        )}
        {!values?.length && (
          <Button variant="gray" tw="w-full" onClick={openFileChooser}>
            + 사진 추가
          </Button>
        )}
      </div>
    </div>
  );
}
