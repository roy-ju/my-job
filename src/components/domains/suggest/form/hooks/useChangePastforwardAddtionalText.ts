/* eslint-disable @typescript-eslint/no-unused-vars */
// import { FormEvent, useCallback, useMemo } from 'react';

// import { useRecoilState } from 'recoil';

// import SuggestFormSelector from '../selector/SuggestFormSelector';

// import SuggestForm from '../types';

export default function useChangePastforwardAddtionalText({
  list,
  selectedList,
}: {
  list: {
    [key: string]: string[];
  }[];
  selectedList: string[];
}) {
  // const [pastForwardAdditionalText, setPastForwardAdditionalText] = useRecoilState<
  //   SuggestForm['pastForwardAdditionalText']
  // >(SuggestFormSelector('pastForwardAdditionalText'));

  // const flattendList = useMemo(() => list.map((ele) => Object.values(ele)).flat(2), [list]);

  // const isRenderField = useMemo(() => {
  //   if (selectedList.filter((ele) => !flattendList.includes(ele)).length > 0) {
  //     return 1;
  //   }
  //   return 0;
  // }, [flattendList, selectedList]);

  // const handleChangeAddtionalConditionsInput = useCallback(
  //   (e?: FormEvent<HTMLTextAreaElement>) => {
  //     if (e) {
  //       const { value } = e.currentTarget;
  //       if (value.length > 200) {
  //         setPastForwardAdditionalText(value.slice(value.length - 200, value.length));
  //       } else {
  //         setPastForwardAdditionalText(value.slice(0, 200));
  //       }
  //     }
  //   },
  //   [setPastForwardAdditionalText],
  // );

  return {
    // isRenderField,
    // handleChangeAddtionalConditionsInput,
    // pastForwardAdditionalText: pastForwardAdditionalText ?? '',
  };
}
