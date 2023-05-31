import { Children, isValidElement, ReactNode } from 'react';

export default function getChildrenByType(children: ReactNode, componentType: any) {
  const childrenArray = Children.toArray(children);

  const filtered = childrenArray.filter((child) => isValidElement(child) && child.type === componentType);
  return filtered.length > 0 ? filtered : null;
}
