import { action, computed, makeObservable, observable } from 'mobx';
import { ticketsStore, ITicket } from './ticketsStore';

export type TSortingParameter = 'cheapest' | 'fastest' | 'optimal';

const getFlightTime = (ticket: ITicket) => {
  const [seg1, seg2] = ticket.segments;
  return seg1.duration + seg2.duration;
};

const getStopsCount = (ticket: ITicket) => {
  const [seg1, seg2] = ticket.segments;
  return seg1.stops.length + seg2.stops.length;
};

class SortedTicketsStore {
  currentSortingParameter: TSortingParameter = 'cheapest';

  setCurrentSortingParameter(sortBy: TSortingParameter) {
    this.currentSortingParameter = sortBy;
  }

  get sortedTickets() {
    const tickets = ticketsStore.tickets.slice();

    if (this.currentSortingParameter === 'cheapest') {
      return tickets.sort((ticket1, ticket2) => ticket1.price - ticket2.price);
    }

    if (this.currentSortingParameter === 'fastest') {
      return tickets.sort((ticket1, ticket2) => getFlightTime(ticket1) - getFlightTime(ticket2));
    }

    return tickets.sort((ticket1, ticket2) => getStopsCount(ticket1) - getStopsCount(ticket2));
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