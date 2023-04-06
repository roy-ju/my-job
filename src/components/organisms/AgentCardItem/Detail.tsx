interface DetailProps {
  cellPhone?: string;
  fullJibunAddress?: string;
  registrationNumber?: string;
  description?: string;
}

export default function AgentCardItemDetail({
  cellPhone,
  fullJibunAddress,
  registrationNumber,
  description,
}: DetailProps) {
  return (
    <div tw="mt-4 flex flex-col gap-2">
      <div tw="flex">
        <span tw="text-mobCaption text-gray-700 mr-1 min-w-[3.25rem]">전화번호</span>
        <span tw="text-mobCaption ">{cellPhone}</span>
      </div>
      <div tw="flex">
        <span tw="text-mobCaption text-gray-700 mr-1 min-w-[3.25rem]">주소</span>
        <span tw="text-mobCaption ">{fullJibunAddress}</span>
      </div>
      <div tw="flex">
        <span tw="text-mobCaption text-gray-700 mr-1 min-w-[3.25rem]">등록번호</span>
        <span tw="text-mobCaption ">{registrationNumber}</span>
      </div>
      <div tw="flex">
        <span tw="text-mobCaption text-gray-700 mr-1 min-w-[3.25rem]">한줄소개</span>
        <span tw="text-mobCaption  break-all">{description}</span>
      </div>
    </div>
  );
}
