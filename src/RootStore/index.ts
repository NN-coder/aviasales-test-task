import { DisplayedTicketsStore } from './DisplayedTicketsStore';
import { FilteredTicketsStore } from './FilteredTicketsStore';
import { SearchIdStore } from './SearchIdStore';
import { SortedTicketsStore } from './SortedTicketsStore';
import { TicketsStore } from './TicketsStore';

export class RootStore {
  searchIdStore = new SearchIdStore(this);
  ticketsStore = new TicketsStore(this);
  sortedTicketsStore = new SortedTicketsStore(this);
  filteredTicketsStore = new FilteredTicketsStore(this);
  displayedTicketsStore = new DisplayedTicketsStore(this);
}
