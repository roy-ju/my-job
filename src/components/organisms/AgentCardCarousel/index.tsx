import List from './List';

export interface AgentCarouselItem {
  id: number;
  officeName: string;
  profileImageFullPath: string;
  name: string;
  officePhone: string;
  fullJibunAddress: string;
  registrationNumber: string;
  description: string;
}
export interface AgentCardCarouselProps {
  data: AgentCarouselItem[];
  index?: number;
  onChangeIndex?: (index: number) => void;
}

export default function AgentCardCarousel({ data, index, onChangeIndex }: AgentCardCarouselProps) {
  return (
    <div>
      <List data={data} index={index} onChangeIndex={onChangeIndex} />
    </div>
  );
}
