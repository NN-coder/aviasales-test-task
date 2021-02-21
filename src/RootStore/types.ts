export interface ISegment {
  origin: string;
  destination: string;
  date: string;
  stops: string[];
  duration: number;
}

export interface ITicket {
  price: number;
  carrier: string;
  segments: [ISegment, ISegment];
  id: string;
}

export type TSortingParameter = 'cheapest' | 'fastest' | 'optimal';

export interface IFilterParameters {
  stops: Map<number, boolean>;
}
