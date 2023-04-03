interface Props {
  value?: number | string | null | boolean;
}

export default function NewCount(props: Props) {
  const { value } = props;

  return (
    <div tw="flex gap-4">
      {value && (
        <div tw="flex items-center justify-center rounded-full bg-red-800 w-4 h-4">
          <span tw="text-count font-medium text-white text-center">{value}</span>
        </div>
      )}
    </div>
  );
}
