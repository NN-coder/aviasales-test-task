import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { store } from '../../store';
import { ErrorPlaceholder, LoadingPlaceholder } from './Placeholders';
import { Ticket } from './Ticket';
import './style.scss';

export const Main: React.FC = observer(() => {
  const { tickets, searchId } = store;

  const hasError = searchId.hasError || tickets.hasError;
  const isLoading = searchId.isLoading || tickets.isLoading;

  const [ticketsToShow, showTickets] = useState(5);

  useEffect(() => {
    store.fetchTickets();
  }, []);

  const showMoreTickets = useCallback(() => showTickets((prevVal) => prevVal + 5), []);

  return (
    <main className="main">
      {tickets.value.slice(0, ticketsToShow).map((ticket) => (
        <Ticket key={ticket.id} {...ticket} />
      ))}

      {isLoading && <LoadingPlaceholder />}
      {hasError && !isLoading && <ErrorPlaceholder />}

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
