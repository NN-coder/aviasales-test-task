import { createContext, useContext } from 'react';
import { RootStore } from '../RootStore';

export const StoreContext = createContext<RootStore>({} as RootStore);
StoreContext.displayName = 'StoreContext';

export function useStoreContext(): RootStore {
  return useContext(StoreContext);
}
