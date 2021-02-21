import { action, computed, makeObservable, observable } from 'mobx';
import { RootStore } from '.';
import { IFilterParameters, ITicket } from './types';

export class FilteredTicketsStore {
  private rootStore: RootStore;

  currentFilterParameters: IFilterParameters = {
    stops: new Map([
      [0, true],
      [1, true],
      [2, true],
      [3, true],
    ]),
  };

  changeStopsFilterParameter(
    actionType: 'add' | 'remove' | 'toggle',
    ...stopsCountParams: number[]
  ): void {
    const { stops } = this.currentFilterParameters;

    if (actionType === 'toggle') {
      stopsCountParams.forEach((stopsCount) => stops.set(stopsCount, !stops.get(stopsCount)));
      return;
    }

    stopsCountParams.forEach((stopsCount) =>
      // eslint-disable-next-line no-unneeded-ternary
      stops.set(stopsCount, actionType === 'add' ? true : false)
    );
  }

  get filteredTickets(): ITicket[] {
    const { stops } = this.currentFilterParameters;
    const { sortedTickets } = this.rootStore.sortedTicketsStore;

    return sortedTickets.filter(
      ({ segments: [seg1, seg2] }) => stops.get(seg1.stops.length) || stops.get(seg2.stops.length)
    );
  }

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.changeStopsFilterParameter = this.changeStopsFilterParameter.bind(this);

    makeObservable(this, {
      currentFilterParameters: observable,
      changeStopsFilterParameter: action,
      filteredTickets: computed,
    });
  }
}
