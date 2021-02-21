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

type ISortedTicketsCache = {
  [p in TSortingParameter]: ITicket[];
};

class SortedTicketsStore {
  currentSortingParameter: TSortingParameter = 'cheapest';

  setCurrentSortingParameter(sortBy: TSortingParameter) {
    this.currentSortingParameter = sortBy;
  }

  private sortedTicketsCache: ISortedTicketsCache = {
    cheapest: [],
    fastest: [],
    optimal: [],
  };

  private compareFunction = (ticket1: ITicket, ticket2: ITicket) => {
    if (this.currentSortingParameter === 'cheapest') {
      return ticket1.price - ticket2.price;
    }

    if (this.currentSortingParameter === 'fastest') {
      return getFlightTime(ticket1) - getFlightTime(ticket2);
    }

    return getStopsCount(ticket1) - getStopsCount(ticket2);
  };

  get sortedTickets() {
    const { currentSortingParameter } = this;
    const tickets = ticketsStore.tickets.slice();

    if (this.sortedTicketsCache[currentSortingParameter].length >= tickets.length) {
      return this.sortedTicketsCache[currentSortingParameter];
    }

    this.sortedTicketsCache[currentSortingParameter] = tickets.sort(this.compareFunction);
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
