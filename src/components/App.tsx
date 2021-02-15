import React from 'react';
import { StyledFilterPanel } from './StyledFilterPanel';
import { StyledLogo } from './StyledLogo';
import { StyledMain } from './Main';

export const App: React.FC = () => (
  <>
    <StyledLogo />
    <StyledFilterPanel />
    <StyledMain />
  </>
);
