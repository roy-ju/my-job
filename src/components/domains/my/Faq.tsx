import tw, { styled } from 'twin.macro';

import Container from '@/components/atoms/Container';

import Loading from '@/components/atoms/Loading';

import LoadingContainer from '@/components/atoms/LoadingContainer';

import SeperatorV2 from '@/components/atoms/SeperatorV2';

import { NavigationHeader } from '@/components/molecules';

import useIosWebkitNoneApplySafeArea from '@/hooks/useIosWebkitNoneApplySafeArea';

import useFetchInternalFaqList from '@/apis/internal/getFaqs';

import FilterCategories from './faq/FilterCategories';

import List from './faq/List';

import useHandleClickBack from './faq/hooks/useHandleClickBack';

import useFilterCategoryAndGetList from './faq/hooks/useFilterCategoryAndGetList';

const FilterWrraper = styled.div`
  ${tw`px-5 pt-6 pb-10 bg-white`}
`;

const ListWrrpaer = styled.div`
  ${tw`py-5 overflow-y-auto`}
`;

export default function Faq() {
  const { data } = useFetchInternalFaqList();

  const { categories, list, filterCategory, handleChangeFilterCategory } = useFilterCategoryAndGetList({ data });

  const { handleClickBack } = useHandleClickBack();

  useIosWebkitNoneApplySafeArea();

  if (!data) {
    return (
      <LoadingContainer>
        <Loading />
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={handleClickBack} />
        <NavigationHeader.Title>자주 묻는 질문</NavigationHeader.Title>
      </NavigationHeader>
      <FilterWrraper>
        <FilterCategories categories={categories} filter={filterCategory} handleChange={handleChangeFilterCategory} />
      </FilterWrraper>
      <SeperatorV2 />
      <ListWrrpaer>
        <List list={list} />
      </ListWrrpaer>
    </Container>
  );
}
