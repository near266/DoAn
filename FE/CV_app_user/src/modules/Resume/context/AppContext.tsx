import { createContext } from 'react';

import { ICvProfile } from '@/interfaces';

interface ContextType {
  profileData: ICvProfile;
  dispatchProfileData: (params: any) => void;
  builders: any;
  dispatchBuilder: (params: any) => void;
}

const AppContext = createContext<ContextType>({
  profileData: {},
  dispatchProfileData: (param) => {},
  builders: {},
  dispatchBuilder: (param) => {},
});

export default AppContext;
