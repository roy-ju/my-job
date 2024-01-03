import Keys from '@/constants/storage_keys';

import fetcher from './fetcher';

export default function authFetcher(arg: string | [string, any]): Promise<any> {
  if (typeof window !== 'undefined' && localStorage.getItem(Keys.ACCESS_TOKEN)) {
    return fetcher(arg);
  }
  return Promise.resolve(null);
}
