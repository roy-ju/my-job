/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useMemo, useCallback } from 'react';

import { useRouter } from 'next/router';

import tw, { styled } from 'twin.macro';

import Loading from '@/components/atoms/Loading';

import { NavigationHeader } from '@/components/molecules';

import useIosWebkitNoneApplySafeArea from '@/hooks/useIosWebkitNoneApplySafeArea';

import useFetchInternalFaqList from '@/apis/internal/getFaqs';

const Container = styled.div`
  ${tw`flex flex-col w-full h-full`}
`;

export default function Faq() {
  const router = useRouter();

  const [category, setCategory] = useState('');

  useIosWebkitNoneApplySafeArea();

  const { data } = useFetchInternalFaqList();

  const categories = useMemo(() => {
    if (!data) return [];
    if (data) {
      return Object.keys(data);
    }
  }, [data]);

  useEffect(() => {
    if (categories?.length) setCategory(categories[0]);
  }, [categories]);

  const handleClickBack = useCallback(() => {
    router.back();
  }, [router]);

  if (!data) {
    return (
      <div tw="py-20">
        <Loading />
      </div>
    );
  }

  return (
    <Container>
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={handleClickBack} />
        <NavigationHeader.Title>자주 묻는 질문</NavigationHeader.Title>
      </NavigationHeader>
    </Container>
  );
}
