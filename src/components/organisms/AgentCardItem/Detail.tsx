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
  const fields = [
    { label: '전화번호', value: cellPhone },
    { label: '주소', value: fullJibunAddress },
    { label: '등록번호', value: registrationNumber },
    { label: '한줄소개', value: description },
  ];

  return (
    <div tw="mt-4 flex flex-col gap-2">
      {fields.map(({ label, value }) => (
        <div key={label} tw="flex">
          <span tw="mr-1 items-start justify-self-start min-w-[3.25rem] text-mobCaption text-gray-700  leading-5">
            {label}
          </span>
          <span tw="break-all text-mobCaption leading-5  overflow-x-hidden whitespace-nowrap text-ellipsis">
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}
