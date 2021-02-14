import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { store } from '../../store';
import { ErrorPlaceholder, LoadingPlaceholder } from './Placeholders';
import { Sort } from './Sort';
import { Ticket } from './Ticket';
import './style.scss';

export const Main: React.FC = observer(() => {
  const { tickets, searchId, sortedTickets } = store;

  const isLoading = searchId.isLoading || tickets.isLoading;
  // Loading state prevails over the error state
  const hasError = (searchId.hasError || tickets.hasError) && !isLoading;

  const [ticketsToShow, showTickets] = useState(5);

  useEffect(() => {
    store.fetchTickets();
  }, []);

  const showMoreTickets = useCallback(() => showTickets((prevVal) => prevVal + 5), []);

  return (
    <main className="main">
      <Sort />

      {sortedTickets.slice(0, ticketsToShow).map((ticket) => (
        <Ticket key={ticket.id} {...ticket} />
      ))}

      {isLoading && <LoadingPlaceholder />}
      {hasError && <ErrorPlaceholder />}

      {!tickets.isCompleted && (
        <button
          type="button"
          className="standard-block main__btn"
          onClick={hasError ? store.fetchTickets : showMoreTickets}
        >
          {hasError ? 'Попробовать ещё раз' : 'Показать еще 5 билетов'}
        </button>
      )}
    </main>
  );
});
