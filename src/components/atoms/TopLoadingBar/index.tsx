interface Props {
  progress: number;
}

export default function TopLoadingBar({ progress }: Props) {
  return (
    <div tw="h-1.5 w-full bg-gray-200">
      <div
        tw="h-1.5 bg-nego-600"
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  );
}
