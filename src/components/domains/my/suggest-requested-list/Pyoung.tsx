export default function Pyoung({ pyoung }: { pyoung?: string }) {
  if (!pyoung) return null;

  if (pyoung.includes('잘 모르겠어요')) {
    return <div tw="text-gray-700 text-body_02">평형 잘 모르겠어요</div>;
  }

  return <div tw="text-gray-700 text-body_02">{pyoung}</div>;
}
