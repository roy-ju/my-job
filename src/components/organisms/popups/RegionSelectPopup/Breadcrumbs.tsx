type BreadcrumbsProps = {
  value1?: string;
  value2?: string;
  value3?: string;
};

export default function Breadcrumbs({ value1, value2, value3 }: BreadcrumbsProps) {
  return (
    <section>
      <div tw="h-14 px-5 flex items-center gap-3 text-b2">
        <span>{value1 ?? '시도'}</span>
        <span tw="w-px h-2 bg-gray-300" />
        <span>{value2 ?? '시군구'}</span>
        <span tw="w-px h-2 bg-gray-300" />
        <span>{value3 ?? '읍면동'}</span>
      </div>
    </section>
  );
}
