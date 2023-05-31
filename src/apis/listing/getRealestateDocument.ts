import useSWR from 'swr';

interface OwnerList {
  owner: string;
  registration_number: string;
  share: string;
  address: string;
  number: string;
}

interface DebtList1 {
  number: string;
  purpose: string;
  application_info: string;
  description: string;
  owner: string;
}

interface DebtList2 {
  number: string;
  purpose: string;
  application_info: string;
  description: string;
  owner: string;
}

export interface GetRealestateDocumentResponse {
  created_time: string | null;
  owner_list: OwnerList[] | null;
  debt_list1: DebtList1[] | null;
  debt_list2: DebtList2[] | null;
}

export default function useAPI_GetRealestateDocument(listingID: number) {
  const { data, isLoading } = useSWR<GetRealestateDocumentResponse>(
    listingID
      ? [
          '/listing/realestatedocument/summary',
          {
            listing_id: listingID,
          },
        ]
      : null,
  );

  return {
    data,
    isLoading,
  };
}
