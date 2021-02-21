import { action, makeObservable, observable, runInAction } from 'mobx';
import { RootStore } from '.';

interface ISearchIdResponse {
  searchId: string;
}

export class SearchIdStore {
  private rootStore: RootStore;
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

  async fetchSearchId(): Promise<void> {
    this.isLoading = true;

    const res = await fetch('https://front-test.beta.aviasales.ru/search', { method: 'GET' });

    if (res.ok) {
      const resBody: ISearchIdResponse = await res.json();
      runInAction(() => this.handleSuccessfulResponse(resBody));
    } else {
      runInAction(() => this.handleFailedResponse());
    }
  }

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.fetchSearchId = this.fetchSearchId.bind(this);

    makeObservable(this, {
      searchId: observable,
      isLoading: observable,
      hasError: observable,
      fetchSearchId: action,
    });
  }
}
