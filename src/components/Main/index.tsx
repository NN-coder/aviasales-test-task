/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { observer } from 'mobx-react-lite';
import { useStoreContext } from '../StoreContext';
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
  const {
    searchIdStore,
    ticketsStore,
    displayedTicketsStore,
    filteredTicketsStore,
  } = useStoreContext();

  const { isCompleted, fetchTickets } = ticketsStore;
  const { displayedTickets, showMoreTickets } = displayedTicketsStore;
  const { changeStopsFilterParameter } = filteredTicketsStore;

  const isLoading = searchIdStore.isLoading || ticketsStore.isLoading;
  const hasError = searchIdStore.hasError || ticketsStore.hasError;
  const isEmpty = displayedTickets.length === 0;

  useEffect(() => {
    fetchTickets();
  }, []);

  const getMainBtnProps = (): React.DOMAttributes<HTMLButtonElement> => {
    if (isLoading) return { children: 'Подождите...' };
    if (hasError) return { onClick: fetchTickets, children: 'Попробовать ещё раз' };

    if (isEmpty)
      return {
        onClick: () => changeStopsFilterParameter('add', 0, 1, 2, 3),
        children: 'Расслабить фильтры',
      };

    return { onClick: showMoreTickets, children: 'Показать ещё 5 билетов' };
  };

  return (
    <main className={className}>
      <StyledSortingPanel />

      {isCompleted &&
        displayedTickets.map((ticket) => <StyledTicket key={ticket.id} {...ticket} />)}

      <Placeholders {...{ isLoading, hasError, isEmpty }} />

      <MainBtn as="button" type="button" {...getMainBtnProps()} />
    </main>
  );
});

export const StyledMain = styled(Main)`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;
