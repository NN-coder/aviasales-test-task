import React from 'react';
import styled, { css } from 'styled-components/macro';
import { observer } from 'mobx-react-lite';
import { store } from '../../../store';
import { StandardBlock } from '../../StandardBlock';

const activeBtnStyles = css`
  color: white;
  background-color: var(--blue);
`;

const SortBtn = styled.button.attrs({ type: 'button' })<{ active: boolean }>`
  width: 100%;
  height: 50px;
  font-weight: 600;
  font-size: 1.2rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  transition: 0.2s;
  ${({ active }) => (active ? activeBtnStyles : '')}
  &:hover,
  &:focus {
    ${activeBtnStyles}
  }
  &:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  &:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`;

export interface IProps {
  className?: string;
}

const Sort: React.FC<IProps> = observer(({ className }) => {
  const { currentSort, setCurrentSort } = store;

  return (
    <StandardBlock className={className}>
      <SortBtn active={currentSort === 'cheapest'} onClick={() => setCurrentSort('cheapest')}>
        Самый дешевый
      </SortBtn>
      <SortBtn active={currentSort === 'fastest'} onClick={() => setCurrentSort('fastest')}>
        Самый быстрый
      </SortBtn>
      <SortBtn active={currentSort === 'optimal'} onClick={() => setCurrentSort('optimal')}>
        Оптимальный
      </SortBtn>
    </StandardBlock>
  );
});

export const StyledSort = styled(Sort)`
  display: flex;
`;
