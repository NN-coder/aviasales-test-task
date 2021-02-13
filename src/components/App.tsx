import React from 'react';
import { Filter } from './Filter';
import { Logo } from './Logo';
import { Main } from './Main';

export const App: React.FC = () => (
  <>
    <Logo />
    <Filter />
    <Main />
  </>
);
