import List from './List';

export interface AgentCardCarouselProps {
  data: {
    officeName: string;
    profileImageFullPath: string;
    name: string;
    cellPhone: string;
    fullJibunAddress: string;
    registrationNumber: string;
    description: string;
  }[];
}

export default function AgentCardCarousel({ data }: AgentCardCarouselProps) {
  return (
    <div>
      <List data={data} />
    </div>
  );
}
