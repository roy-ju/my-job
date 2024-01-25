type RemainTimesMessageProps = {
  time: number;
};

export default function RemainTimesMessage({ time }: RemainTimesMessageProps) {
  return (
    <div tw="px-5 flex items-center justify-center">
      <span tw="text-subhead_02 text-nego-800 mr-0.5">{time}</span>
      <p tw="text-body_02 text-gray-700">초 후 화면이 자동으로 전환됩니다.</p>
    </div>
  );
}
