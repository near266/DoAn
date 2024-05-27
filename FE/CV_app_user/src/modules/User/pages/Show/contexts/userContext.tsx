import { createContext } from 'react';

interface ContextType {
  showForCurrentUser: boolean;
  showForAnotherUser: boolean;
}

const UserContext = createContext<ContextType>({
  showForCurrentUser: false,
  showForAnotherUser: false,
});

export default UserContext;
