import React from 'react';
import styled, { css } from 'styled-components/macro';
import { observer } from 'mobx-react-lite';
import { useStoreContext } from '../../StoreContext';
import { StandardBlock } from '../../StandardBlock';

const activeBtnStyles = css`
  color: white;
  background-color: var(--blue);
`;

const SortBtn = styled.button.attrs({ type: 'button' })<{ active: boolean }>`
  width: 100%;
  height: 50px;
  /* padding: 0 5px; */
  font-weight: 600;
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

const SortingPanel: React.FC<IProps> = observer(({ className }) => {
  const {
    sortedTicketsStore: { currentSortingParameter, setCurrentSortingParameter },
  } = useStoreContext();

  return (
    <StandardBlock className={className}>
      <SortBtn
        active={currentSortingParameter === 'cheapest'}
        onClick={() => setCurrentSortingParameter('cheapest')}
      >
        Самый дешевый
      </SortBtn>
      <SortBtn
        active={currentSortingParameter === 'fastest'}
        onClick={() => setCurrentSortingParameter('fastest')}
      >
        Самый быстрый
      </SortBtn>
      <SortBtn
        active={currentSortingParameter === 'optimal'}
        onClick={() => setCurrentSortingParameter('optimal')}
      >
        Оптимальный
      </SortBtn>
    </StandardBlock>
  );
});

export const StyledSortingPanel = styled(SortingPanel)`
  display: flex;
  font-size: 1.2rem;
`;
