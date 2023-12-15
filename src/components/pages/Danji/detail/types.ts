import { KeyedMutator } from "swr";

import { DanjiDetailResponse } from "@/services/danji/types";

export type State = {
  danji: DanjiDetailResponse;
  isLoading: false;
  mutate: KeyedMutator<DanjiDetailResponse>;
  error: any;
};