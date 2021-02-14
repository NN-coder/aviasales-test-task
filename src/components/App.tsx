import React from 'react';
import { StyledFilter } from './StyledFilter';
import { StyledLogo } from './StyledLogo';
import { StyledMain } from './Main';

export const App: React.FC = () => (
  <>
    <StyledLogo />
    <StyledFilter />
    <StyledMain />
  </>
);
