import sum from 'lodash/sum';

export function formatUseAcceptedYear(value: string) {
  if (value.length === 4) {
    return `${value}년`;
  }

  if (value.length === 6) {
    return `${value.substring(0, 4)}년 ${value.substring(4, 6)}월`;
  }

  if (value.length === 8) {
    return `${value.substring(0, 4)}년 ${value.substring(4, 6)}월 ${value.substring(6, 8)}일`;
  }

  return value;
}

type PlaceTypeArr = {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  place_name: string;
  x: string;
  y: string;
  id: string;
  phone: string;
  road_address_name: string;
  place_url: string;
}[];

function duplicatedPlaceNameMergeFunc(arr: PlaceTypeArr) {
  const categoryArray: string[] = [];
  const distanceArray: string[] = [];
  const xArray: string[] = [];
  const yArray: string[] = [];

  const assigningObj = {
    category_name: categoryArray,
    distance: distanceArray,
    x: xArray,
    y: yArray,
  };

  for (let i = 0; i < arr.length; i += 1) {
    categoryArray.push(arr[i].category_name);
    distanceArray.push(arr[i].distance);
    xArray.push(arr[i].x);
    yArray.push(arr[i].y);
  }

  return Object.assign(arr[0], assigningObj);
}

export function convertedArr(arr: PlaceTypeArr) {
  if (!arr || arr.length === 0) return [];

  const duplicatedArr = [];

  for (let i = 0; i < arr.length; i += 1) {
    if (arr.filter((item) => item.place_name === arr[i].place_name).length > 1) {
      const duplicatedList = arr.filter((item) => item.place_name === arr[i].place_name);

      duplicatedArr.push(duplicatedPlaceNameMergeFunc(duplicatedList));
      delete arr[i];
    }
  }

  const resultAssigned = arr.filter((n) => n);

  const resultAssigning = duplicatedArr.filter(
    (array, index, callback) => index === callback.findIndex((t) => t.place_name === array.place_name),
  );

  for (let j = 0; j < resultAssigned.length; j += 1) {
    if (resultAssigning.find((item) => item.place_name === resultAssigned[j].place_name)) {
      // @ts-ignore
      resultAssigned[j] = resultAssigning.find((item) => item.place_name === resultAssigned[j].place_name);
    }
  }
  return resultAssigned;
}

function duplicatedAddressNameMergeFunc(arr: PlaceTypeArr) {
  const categoryArray: string[] = [];
  const placeNameArray: string[] = [];
  const distanceArray: string[] = [];
  const xArray: string[] = [];
  const yArray: string[] = [];

  const assigningObj = {
    category_name: categoryArray,
    place_name: placeNameArray,
    distance: distanceArray,
    x: xArray,
    y: yArray,
  };

  for (let i = 0; i < arr.length; i += 1) {
    categoryArray.push(arr[i].category_name);
    placeNameArray.push(arr[i].place_name);
    distanceArray.push(arr[i].distance);
    xArray.push(arr[i].x);
    yArray.push(arr[i].y);
  }

  return Object.assign(arr[0], assigningObj);
}

export function convertedArrForMarker(arr: PlaceTypeArr) {
  if (!arr || arr.length === 0) return [];

  const duplicatedArr = [];

  for (let i = 0; i < arr.length; i += 1) {
    if (arr.filter((item) => item.address_name === arr[i].address_name).length > 1) {
      const duplicatedList = arr.filter((item) => item.address_name === arr[i].address_name);
      duplicatedArr.push(duplicatedAddressNameMergeFunc(duplicatedList));
      delete arr[i];
    }
  }

  const resultAssigned = arr.filter((n) => n);

  const resultAssigning = duplicatedArr.filter(
    (array, index, callback) => index === callback.findIndex((t) => t.address_name === array.address_name),
  );

  for (let j = 0; j < resultAssigned.length; j += 1) {
    if (resultAssigning.find((item) => item.address_name === resultAssigned[j].address_name)) {
      // @ts-ignore
      resultAssigned[j] = resultAssigning.find((item) => item.address_name === resultAssigned[j].address_name);
    }
  }
  return resultAssigned;
}

export function getAverageDistance(param: string | string[]) {
  if (!param) return 0;

  if (param.length === 0) return 0;

  if (typeof param === 'string') return param;

  const result = sum(param.map((item) => Number(item))) / param.length;

  return result.toFixed(0);
}
