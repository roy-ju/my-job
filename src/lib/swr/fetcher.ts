import axios from '../axios';

export default async function fetcher(arg: string | [string, any]) {
  if (typeof arg === 'string') {
    return axios.post(arg).then((res) => res.data);
  }
  return axios.post(arg[0], arg[1]).then((res) => res.data);
}
