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
}

export interface ITicketsState {
  isLoading: boolean;
  isCompleted: boolean;
  hasError: boolean;
  value: ITicket[];
}

export interface ISearchIdState extends Pick<ITicketsState, 'isLoading' | 'hasError'> {
  value: string;
}

export interface ITicketsResponse {
  tickets: ITicket[];
  stop: boolean;
}

export interface ISearchIdResponse {
  searchId: string;
}
