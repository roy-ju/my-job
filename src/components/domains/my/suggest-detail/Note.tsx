export default function Note({ note }: { note?: string }) {
  if (!note) return null;

  return <p tw="text-body_02 text-gray-700">{note}</p>;
}
