export default function NoDataTypeOne({ message }: { message: string }) {
  return (
    <div tw="w-full flex justify-center items-center">
      <span tw="text-gray-700 text-b2 [line-height: 20px]">{message}</span>
    </div>
  );
}
