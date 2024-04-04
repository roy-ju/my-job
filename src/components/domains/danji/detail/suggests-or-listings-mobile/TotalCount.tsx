type TotalCountProps = {
  colorChange: boolean;
  count: number;
};

export default function TotalCount({ colorChange, count }: TotalCountProps) {
  return <span style={colorChange ? { color: '#5F3DC4' } : {}}>{count}</span>;
}
