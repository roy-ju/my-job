interface ButtonProps {
  expanded?: boolean;
  onClick?: () => void;
}

export default function AgentCardItemFoldButton({ onClick, expanded }: ButtonProps) {
  return (
    <button onClick={onClick} tw="block mt-4 underline text-mobCaption mx-auto text-gray-1000" type="button">
      {expanded ? '접어두기' : '자세히 보기'}
    </button>
  );
}
