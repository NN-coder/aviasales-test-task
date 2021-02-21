import React from 'react';
import { StyledFilterPanel } from './StyledFilterPanel';
import { StyledLogo } from './StyledLogo';
import { StyledMain } from './Main';
import { StoreContext } from './StoreContext';
import { RootStore } from '../RootStore';

export const App: React.FC = () => (
  <StoreContext.Provider value={new RootStore()}>
    <StyledLogo />
    <StyledFilterPanel />
    <StyledMain />
  </StoreContext.Provider>
);
