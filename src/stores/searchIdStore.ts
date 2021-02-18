import { action, makeObservable, observable, runInAction } from 'mobx';

interface ISearchIdResponse {
  searchId: string;
}

class SearchIdStore {
  searchId = '';
  isLoading = true;
  hasError = false;

  private handleSuccessfulResponse(resBody: ISearchIdResponse) {
    this.isLoading = false;
    this.hasError = false;
    this.searchId = resBody.searchId;
  }

  private handleFailedResponse() {
    this.isLoading = false;
    this.hasError = true;
  }

  async fetchSearchId() {
    this.isLoading = true;

    const res = await fetch('https://front-test.beta.aviasales.ru/search', { method: 'GET' });

    if (res.ok) {
      const resBody: ISearchIdResponse = await res.json();
      runInAction(() => this.handleSuccessfulResponse(resBody));
    } else {
      runInAction(() => this.handleFailedResponse());
    }

    // return res.ok;
  }

  constructor() {
    this.fetchSearchId = this.fetchSearchId.bind(this);

    makeObservable(this, {
      searchId: observable,
      isLoading: observable,
      hasError: observable,
      fetchSearchId: action,
    });
  }
}

export const searchIdStore = new SearchIdStore();
