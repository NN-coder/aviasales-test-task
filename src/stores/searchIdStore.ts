import { action, makeObservable, observable } from 'mobx';
import { ISearchIdResponse, ISearchIdState } from './types';

class SearchIdStore {
  searchId: ISearchIdState = {
    isLoading: true,
    hasError: false,
    value: '',
  };

  async fetchSearchId() {
    this.searchId.isLoading = true;

    const res = await fetch('https://front-test.beta.aviasales.ru/search', { method: 'GET' });

    if (res.ok) {
      const resBody: ISearchIdResponse = await res.json();
      this.searchId = { isLoading: false, hasError: false, value: resBody.searchId };
    } else {
      this.searchId = { ...this.searchId, isLoading: false, hasError: true };
    }

    return res.ok;
  }

  constructor() {
    this.fetchSearchId = this.fetchSearchId.bind(this);

    makeObservable(this, {
      searchId: observable,
      fetchSearchId: action,
    });
  }
}

export const searchIdStore = new SearchIdStore();
