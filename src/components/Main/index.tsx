/* eslint-disable react/jsx-props-no-spreading */
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { store } from '../../store';
import './style.scss';
import { Ticket } from './Ticket';

export const Main: React.FC = observer(() => {
  useEffect(() => {
    store.fetchTickets();
  }, []);

  return (
    <main className="main">
      {store.tickets.value.slice(0, 5).map((ticket) => (
        // eslint-disable-next-line react/jsx-key
        <Ticket {...ticket} />
      ))}
    </main>
  );
});
