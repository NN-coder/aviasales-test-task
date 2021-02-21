import { action, computed, makeObservable, observable } from 'mobx';
import { sortedTicketsStore } from './sortedTicketsStore';

export interface IFilterParameters {
  stops: Map<number, boolean>;
}

class FilteredTicketsStore {
  currentFilterParameters: IFilterParameters = {
    stops: new Map([
      [0, true],
      [1, true],
      [2, true],
      [3, true],
    ]),
  };

  toggleStopsFilterParameter(...params: number[]) {
    const { stops } = this.currentFilterParameters;
    params.forEach((param) => stops.set(param, !stops.get(param)));
  }

  get filteredTickets() {
    const { stops } = this.currentFilterParameters;

    return sortedTicketsStore.sortedTickets.filter(
      ({ segments: [seg1, seg2] }) => stops.get(seg1.stops.length) || stops.get(seg2.stops.length)
    );
  }

  constructor() {
    this.toggleStopsFilterParameter = this.toggleStopsFilterParameter.bind(this);

    makeObservable(this, {
      currentFilterParameters: observable,
      toggleStopsFilterParameter: action,
      filteredTickets: computed,
    });
  }
}

export const filteredTicketsStore = new FilteredTicketsStore();
