import { BreadCrumbsContainer, BreadCrumbsWrraper } from './widget/RegionSelectWidget';

export default function Breadcrumbs() {
  return (
    <BreadCrumbsContainer>
      <BreadCrumbsWrraper>
        <span>시/도</span>
        <span>시/군/구</span>
        <span>읍/면/동</span>
      </BreadCrumbsWrraper>
    </BreadCrumbsContainer>
  );
}
