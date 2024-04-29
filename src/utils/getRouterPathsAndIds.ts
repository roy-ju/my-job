import Routes from '@/router/routes';

export default function getIdRelatedPaths({ path1, path2 }: { path1?: string; path2?: string }) {
  if (
    path1 === Routes.DanjiPhotos ||
    path1 === Routes.DanjiRealPriceDetail ||
    path1 === Routes.DanjiRealPriceList ||
    path1 === Routes.DanjiRealTradeDetail ||
    path1 === Routes.DanjiSelect ||
    path1 === Routes.DanjiDetail
  ) {
    return Number(path2) > 0 ? { danjiID: Number(path2) } : { danjiID: null };
  }

  return {};
}
