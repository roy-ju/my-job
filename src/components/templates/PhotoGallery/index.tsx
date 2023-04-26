import { NavigationHeader } from '@/components/molecules';

interface Props {
  headerTitle?: string;
  photoPaths?: string[];
}

export default function PhotoGallery({ headerTitle, photoPaths }: Props) {
  return (
    <div tw="h-full flex flex-col">
      <NavigationHeader>
        <NavigationHeader.Title>
          {headerTitle} <span tw="font-bold text-nego">{photoPaths?.length}</span>
        </NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex flex-col flex-1 gap-0.5 overflow-auto">
        {photoPaths?.map((path) => (
          <div
            key={path}
            tw="w-full h-[254px] bg-no-repeat bg-center bg-cover shrink-0"
            style={{
              backgroundImage: `url('${photoPaths?.[0]}')`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
