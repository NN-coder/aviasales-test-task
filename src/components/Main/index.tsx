import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { observer } from 'mobx-react-lite';
import { searchIdStore, ticketsStore, sortedTicketsStore } from '../../stores';
import { StandardBlock } from '../StandardBlock';
import { Placeholders } from './Placeholders';
import { StyledSortingPanel } from './StyledSortingPanel';
import { StyledTicket } from './StyledTicket';

const MainBtn = styled(StandardBlock).attrs({
  as: 'button',
  type: 'button',
})`
  height: 50px;
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  background-color: var(--blue);
`;

export interface IProps {
  className?: string;
}

const Main: React.FC<IProps> = observer(({ className }) => {
  const isLoading = searchIdStore.isLoading || ticketsStore.isLoading;
  const hasError = searchIdStore.hasError || ticketsStore.hasError;

  useEffect(() => {
    ticketsStore.fetchTickets();
  }, []);

  const [ticketsToShow, showTickets] = useState(5);
  const showMoreTickets = useCallback(() => showTickets((prevVal) => prevVal + 5), []);

  return (
    <main className={className}>
      <StyledSortingPanel />

      {ticketsStore.isCompleted &&
        sortedTicketsStore.sortedTickets
          .slice(0, ticketsToShow)
          .map((ticket) => <StyledTicket key={ticket.id} {...ticket} />)}

      <Placeholders isLoading={isLoading} hasError={hasError} />

      <MainBtn onClick={hasError ? ticketsStore.fetchTickets : showMoreTickets}>
        {hasError ? 'Попробовать ещё раз' : 'Показать еще 5 билетов'}
      </MainBtn>
    </main>
  );
});

export const StyledMain = styled(Main)`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;
