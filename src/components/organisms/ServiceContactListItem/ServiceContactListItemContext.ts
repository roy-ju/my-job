import { createContext } from 'react';

interface IServiceContactListItemContext {
  contents: string;
  createdTime: string;
  didReply: boolean;
}

const ServiceContactListItemContext = createContext<IServiceContactListItemContext>({
  contents: '',
  createdTime: '',
  didReply: false,
});

export default ServiceContactListItemContext;
