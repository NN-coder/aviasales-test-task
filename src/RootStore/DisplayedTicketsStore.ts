import { makeObservable, action, observable, computed } from 'mobx';
import { RootStore } from '.';
import { ITicket } from './types';

export class DisplayedTicketsStore {
  private rootStore: RootStore;
  numberOfTicketsDisplayed = 5;

  showMoreTickets(): void {
    this.numberOfTicketsDisplayed += 5;
  }

  get displayedTickets(): ITicket[] {
    const { filteredTickets } = this.rootStore.filteredTicketsStore;
    return filteredTickets.slice(0, this.numberOfTicketsDisplayed);
  }

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.showMoreTickets = this.showMoreTickets.bind(this);

    makeObservable(this, {
      numberOfTicketsDisplayed: observable,
      showMoreTickets: action,
      displayedTickets: computed,
    });
  }
}
