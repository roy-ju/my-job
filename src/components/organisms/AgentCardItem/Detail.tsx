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
    <div className="mt-4 flex flex-col gap-2">
      {fields.map(({ label, value }) => (
        <div key={label} className="flex">
          <div className="mr-1 min-w-[3.25rem] text-mobCaption text-gray-700">{label}</div>
          <div className="break-all text-mobCaption">{value}</div>
        </div>
      ))}
    </div>
  );
}
