import FAQListItem from '@/components/organisms/FAQListItem';
import { v4 as uuidv4 } from 'uuid';

export default function List() {
  return (
    <div tw="flex-1 bg-white py-4">
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <>
            {!!i && <div tw="border-t mx-5 border-gray-100" />}
            <FAQListItem key={uuidv4()} />
          </>
        ))}
    </div>
  );
}
