/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { observer } from 'mobx-react-lite';
import { searchIdStore, ticketsStore, displayedTicketsStore } from '../../stores';
import { StandardBlock } from '../StandardBlock';
import { Placeholders } from './Placeholders';
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
  const { isCompleted, fetchTickets } = ticketsStore;
  const { displayedTickets, showMoreTickets } = displayedTicketsStore;

  const isLoading = searchIdStore.isLoading || ticketsStore.isLoading;
  const hasError = searchIdStore.hasError || ticketsStore.hasError;

  useEffect(() => {
    fetchTickets();
  }, []);

  const getBtnProps = (): React.DOMAttributes<HTMLButtonElement> => {
    if (hasError) return { onClick: fetchTickets, children: 'Попробовать ещё раз' };
    if (!isLoading) return { onClick: showMoreTickets, children: 'Показать ещё 5 билетов' };
    return { children: 'Подождите...' };
  };

  return (
    <main className={className}>
      <StyledSortingPanel />

      {isCompleted &&
        displayedTickets.map((ticket) => <StyledTicket key={ticket.id} {...ticket} />)}

      <Placeholders isLoading={isLoading} hasError={hasError} />

      <MainBtn as="button" type="button" {...getBtnProps()} />
    </main>
  );
});

export const StyledMain = styled(Main)`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;
