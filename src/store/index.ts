import { action, computed, makeObservable, observable } from 'mobx';
import shortid from 'shortid';
import { ISearchIdState, ITicketsState, ISearchIdResponse, ITicketsResponse, TSort } from './types';

class Store {
  searchId: ISearchIdState = {
    isLoading: true,
    hasError: false,
    value: '',
  };

  tickets: ITicketsState = {
    isLoading: true,
    isCompleted: false,
    hasError: false,
    value: [],
  };

  currentSort: TSort = 'cheapest';

  async fetchSearchId() {
    this.searchId = { ...this.searchId, isLoading: true };

    const res = await fetch('https://front-test.beta.aviasales.ru/search', { method: 'GET' });

    if (res.ok) {
      const resBody: ISearchIdResponse = await res.json();
      this.searchId = { isLoading: false, hasError: false, value: resBody.searchId };
      return;
    }

    this.searchId = { ...this.searchId, isLoading: false, hasError: true };
  }

  async fetchTickets() {
    this.tickets = { ...this.tickets, isLoading: true };

    if (this.searchId.isLoading || this.searchId.hasError) {
      await this.fetchSearchId();
    }

    const res = await fetch(
      `https://front-test.beta.aviasales.ru/tickets?searchId=${this.searchId.value}`,
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

  setCurrentSort(by: TSort) {
    this.currentSort = by;
  }

  get sortedTickets() {
    const tickets = this.tickets.value.slice();

    if (this.currentSort === 'cheapest') {
      return tickets.sort((a, b) => a.price - b.price);
    }

    if (this.currentSort === 'fastest') {
      return tickets.sort(
        ({ segments: [a1, a2] }, { segments: [b1, b2] }) =>
          a1.duration + a2.duration - b1.duration - b2.duration
      );
    }

    return tickets;
  }

  constructor() {
    this.fetchSearchId = this.fetchSearchId.bind(this);
    this.fetchTickets = this.fetchTickets.bind(this);
    this.setCurrentSort = this.setCurrentSort.bind(this);

    makeObservable(this, {
      searchId: observable,
      tickets: observable,
      currentSort: observable,
      fetchSearchId: action,
      fetchTickets: action,
      setCurrentSort: action,
      sortedTickets: computed,
    });
  }
}

export const store = new Store();
