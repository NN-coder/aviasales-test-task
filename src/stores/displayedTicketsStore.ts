import { makeObservable, action, observable, computed } from 'mobx';
import { filteredTicketsStore } from './filteredTicketsStore';

class DisplayedTicketsStore {
  numberOfTicketsDisplayed = 5;

  showMoreTickets() {
    this.numberOfTicketsDisplayed += 5;
  }

  get displayedTickets() {
    return filteredTicketsStore.filteredTickets.slice(0, this.numberOfTicketsDisplayed);
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
