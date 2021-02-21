import { action, computed, makeObservable, observable } from 'mobx';
import { RootStore } from '.';
import { ITicket, TSortingParameter } from './types';

const getFlightTime = (ticket: ITicket) => {
  const [seg1, seg2] = ticket.segments;
  return seg1.duration + seg2.duration;
};

const getStopsCount = (ticket: ITicket) => {
  const [seg1, seg2] = ticket.segments;
  return seg1.stops.length + seg2.stops.length;
};

type TSortedTicketsCache = {
  [p in TSortingParameter]: ITicket[];
};

export class SortedTicketsStore {
  private rootStore: RootStore;
  currentSortingParameter: TSortingParameter = 'cheapest';

  setCurrentSortingParameter(param: TSortingParameter): void {
    this.currentSortingParameter = param;
  }

  private sortedTicketsCache: TSortedTicketsCache = {
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

  get sortedTickets(): ITicket[] {
    const { currentSortingParameter, sortedTicketsCache } = this;
    const tickets = this.rootStore.ticketsStore.tickets.slice();

    if (sortedTicketsCache[currentSortingParameter].length >= tickets.length) {
      return sortedTicketsCache[currentSortingParameter];
    }

    sortedTicketsCache[currentSortingParameter] = tickets.sort(this.compareFunction);
    return tickets;
  }

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.setCurrentSortingParameter = this.setCurrentSortingParameter.bind(this);

    makeObservable(this, {
      currentSortingParameter: observable,
      setCurrentSortingParameter: action,
      sortedTickets: computed,
    });
  }
}
