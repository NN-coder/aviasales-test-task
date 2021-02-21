/* eslint-disable no-await-in-loop */
import { action, makeObservable, observable, runInAction } from 'mobx';
import shortid from 'shortid';
import { RootStore } from '.';
import { ITicket } from './types';

interface ITicketsResponse {
  stop: boolean;
  tickets: ITicket[];
}

export class TicketsStore {
  private rootStore: RootStore;
  isLoading = true;
  hasError = false;
  isCompleted = false;
  tickets: ITicket[] = [];

  private handleSuccessfulResponse(resBody: ITicketsResponse) {
    const tickets = resBody.tickets.map((ticket) => ({ ...ticket, id: shortid.generate() }));

    this.tickets = this.tickets.concat(tickets);
    this.isCompleted = resBody.stop;
    this.isLoading = !this.isCompleted;
    this.hasError = false;
  }

  private handleFailedResponse() {
    this.hasError = true;
    this.isLoading = false;
  }

  async fetchTickets(): Promise<void> {
    const { searchIdStore } = this.rootStore;
    this.isLoading = true;

    if (searchIdStore.isLoading || searchIdStore.hasError) {
      await searchIdStore.fetchSearchId();
      if (searchIdStore.hasError) return;
    }

    while (!this.isCompleted) {
      const res = await fetch(
        `https://front-test.beta.aviasales.ru/tickets?searchId=${searchIdStore.searchId}`,
        { method: 'GET' }
      );

      if (res.ok) {
        const resBody: ITicketsResponse = await res.json();
        runInAction(() => this.handleSuccessfulResponse(resBody));
      } else {
        runInAction(() => this.handleFailedResponse());
        break;
      }
    }
  }

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.fetchTickets = this.fetchTickets.bind(this);

    makeObservable(this, {
      isLoading: observable,
      hasError: observable,
      isCompleted: observable,
      tickets: observable,
      fetchTickets: action,
    });
  }
}
