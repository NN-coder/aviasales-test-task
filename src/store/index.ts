/* eslint-disable @typescript-eslint/lines-between-class-members */
import { action, makeObservable, observable } from 'mobx';
import { ISearchIdState, ITicketsState, ISearchIdResponse, ITicketsResponse } from './types';

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
      this.tickets = {
        isLoading: false,
        isCompleted: resBody.stop,
        hasError: false,
        value: this.tickets.value.concat(resBody.tickets),
      };
      return;
    }

    this.tickets = { ...this.tickets, isLoading: false, hasError: true };
  }

  constructor() {
    this.fetchSearchId = this.fetchSearchId.bind(this);
    this.fetchTickets = this.fetchTickets.bind(this);

    makeObservable(this, {
      searchId: observable,
      tickets: observable,
      fetchSearchId: action,
      fetchTickets: action,
    });
  }
}

export const store = new Store();
