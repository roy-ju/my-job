

import { nanoid } from 'nanoid';

const storagePrefix = 'negocio_user_mob_next_js_';

export type RecentSearch = {
  id: string;
  createdTime: string;

  query: {
    id?: string;
    addressName: string;
    categoryName: string;
    placeName: string;
    roadAddressName: string;
    lat: number;
    lng: number;
  };
};

const recentSearchStorage = {
  getRecentSearches: () => {
      if (typeof window !== 'undefined') {
        const recentSearches = localStorage.getItem(`${storagePrefix}recentSearches`);
        const items = recentSearches ? (JSON.parse(recentSearches) as RecentSearch[]) : [];
        items.sort((a, b) => (new Date(a.createdTime) < new Date(b.createdTime) ? -1 : 1));
      
        return items; 
      }    
    
      return []
  },
  
  clearRecentSearches: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(`${storagePrefix}recentSearches`);
      };
  },
  
  addRecentSearch: (item: Omit<RecentSearch, 'id' | 'createdTime'>) => {
    if (typeof window !== 'undefined') {
    const recentSearchesRaw = localStorage.getItem(`${storagePrefix}recentSearches`);
    const recentSearches = recentSearchesRaw ? (JSON.parse(recentSearchesRaw) as RecentSearch[]) : [];
    
    recentSearches.push({
      id: nanoid(),
      createdTime: new Date().toISOString(),
      ...item,
    });
    localStorage.setItem(`${storagePrefix}recentSearches`, JSON.stringify(recentSearches))
  };
  },
  
  removeRecentSearch: (id: string) => {
    if (typeof window !== 'undefined') {
    const recentSearchesRaw = localStorage.getItem(`${storagePrefix}recentSearches`);
    const recentSearches = recentSearchesRaw ? (JSON.parse(recentSearchesRaw) as RecentSearch[]) : [];
    localStorage.setItem(
      `${storagePrefix}recentSearches`,
      JSON.stringify(recentSearches.filter((item) => item.id !== id)),
    );
  }
  }
};


const storage = {
  ...recentSearchStorage,
};

export default storage;