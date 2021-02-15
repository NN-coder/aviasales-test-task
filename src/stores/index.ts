import { configure } from 'mobx';

configure({
  enforceActions: 'never',
});

export { searchIdStore } from './searchIdStore';
export { ticketsStore } from './ticketsStore';
export { sortedTicketsStore } from './sortedTicketsStore';
