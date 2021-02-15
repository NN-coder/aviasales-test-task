import { action, computed, makeObservable, observable } from 'mobx';
import { ticketsStore } from './ticketsStore';
import { ITicket, TSortingParameter } from './types';

const getFlightTime = (ticket: ITicket) => {
  const [seg1, seg2] = ticket.segments;
  return seg1.duration + seg2.duration;
};

class SortedTicketsStore {
  currentSortingParameter: TSortingParameter = 'cheapest';

  setCurrentSortingParameter(sortBy: TSortingParameter) {
    this.currentSortingParameter = sortBy;
  }

  get sortedTickets() {
    const tickets = ticketsStore.tickets.value.slice();
    const { currentSortingParameter } = this;

    if (currentSortingParameter === 'cheapest') {
      return tickets.sort((ticket1, ticket2) => ticket1.price - ticket2.price);
    }

    if (currentSortingParameter === 'fastest') {
      return tickets.sort((ticket1, ticket2) => getFlightTime(ticket1) - getFlightTime(ticket2));
    }

    // TODO: Understand what "Sort by optimality" means
    return tickets;
  }

  constructor() {
    this.setCurrentSortingParameter = this.setCurrentSortingParameter.bind(this);

    makeObservable(this, {
      currentSortingParameter: observable,
      setCurrentSortingParameter: action,
      sortedTickets: computed,
    });
  }
}

export const sortedTicketsStore = new SortedTicketsStore();
