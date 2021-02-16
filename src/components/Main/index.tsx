/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { observer } from 'mobx-react-lite';
import { searchIdStore, ticketsStore, sortedTicketsStore } from '../../stores';
import { StandardBlock } from '../StandardBlock';
import { ErrorPlaceholder, LoadingPlaceholder } from './Placeholders';
import { StyledSortingPanel } from './StyledSortingPanel';
import { StyledTicket } from './StyledTicket';

const MainBtn = styled(StandardBlock)`
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
  const { searchId } = searchIdStore;
  const { tickets, fetchTickets } = ticketsStore;
  const { sortedTickets } = sortedTicketsStore;

  const isLoading = searchId.isLoading || tickets.isLoading;
  // Loading state prevails over the error state
  const hasError = (searchId.hasError || tickets.hasError) && !isLoading;

  const [ticketsToShow, showTickets] = useState(5);

  useEffect(() => {
    fetchTickets();
  }, []);

  const showMoreTickets = useCallback(() => showTickets((prevVal) => prevVal + 5), []);

  return (
    <main className={className}>
      <StyledSortingPanel />

      {sortedTickets.slice(0, ticketsToShow).map((ticket) => (
        <StyledTicket key={ticket.id} {...ticket} />
      ))}

      {isLoading && <LoadingPlaceholder />}
      {hasError && <ErrorPlaceholder />}

      {!tickets.isCompleted && (
        <MainBtn as="button" type="button" onClick={hasError ? fetchTickets : showMoreTickets}>
          {hasError ? 'Попробовать ещё раз' : 'Показать еще 5 билетов'}
        </MainBtn>
      )}
    </main>
  );
});

export const StyledMain = styled(Main)`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;
