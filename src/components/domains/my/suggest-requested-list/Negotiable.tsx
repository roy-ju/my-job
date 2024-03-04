import React from 'react';

export default function Negotiable({ negotiable }: { negotiable: boolean }) {
  if (!negotiable) return null;

  return <span>&nbsp;(협의가능)</span>;
}
