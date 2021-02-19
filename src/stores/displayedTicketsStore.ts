import { makeObservable, action, observable, computed } from 'mobx';
import { sortedTicketsStore } from './sortedTicketsStore';

class DisplayedTicketsStore {
  numberOfTicketsDisplayed = 5;

  showMoreTickets() {
    this.numberOfTicketsDisplayed += 5;
  }

  get displayedTickets() {
    return sortedTicketsStore.sortedTickets.slice(0, this.numberOfTicketsDisplayed);
  }

  constructor() {
    this.showMoreTickets = this.showMoreTickets.bind(this);

    makeObservable(this, {
      numberOfTicketsDisplayed: observable,
      showMoreTickets: action,
      displayedTickets: computed,
    });
  }
}

export const displayedTicketsStore = new DisplayedTicketsStore();
