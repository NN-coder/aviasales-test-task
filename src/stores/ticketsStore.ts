import { action, makeObservable, observable } from 'mobx';
import shortid from 'shortid';
import { searchIdStore } from './searchIdStore';
import { ITicketsResponse, ITicketsState } from './types';

class TicketsStore {
  tickets: ITicketsState = {
    isLoading: true,
    hasError: false,
    isCompleted: false,
    value: [],
  };

  async fetchTickets() {
    this.tickets.isLoading = true;

    if (searchIdStore.searchId.isLoading || searchIdStore.searchId.hasError) {
      await searchIdStore.fetchSearchId();
    }

    const res = await fetch(
      `https://front-test.beta.aviasales.ru/tickets?searchId=${searchIdStore.searchId.value}`,
      { method: 'GET' }
    );

    if (res.ok) {
      const resBody: ITicketsResponse = await res.json();

      const tickets = resBody.tickets.map((ticket) => ({ ...ticket, id: shortid.generate() }));

      this.tickets = {
        isLoading: false,
        isCompleted: resBody.stop,
        hasError: false,
        value: this.tickets.value.concat(tickets),
      };
      return;
    }

    this.tickets = { ...this.tickets, isLoading: false, hasError: true };
  }

  constructor() {
    this.fetchTickets = this.fetchTickets.bind(this);

    makeObservable(this, {
      tickets: observable,
      fetchTickets: action,
    });
  }
}

export const ticketsStore = new TicketsStore();
