interface TermsTemplateProps {
  termDate: string;
  html: string;
}

export default function TermsTemplate({ termDate, html }: TermsTemplateProps) {
  return (
    <div tw="flex flex-col h-full">
      <div tw="flex-1 min-h-0 overflow-y-auto">
        <div tw="mt-7 px-5 text-gray-700 text-info">시행일자: {termDate}</div>
        <div tw="mt-3 px-5" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}
